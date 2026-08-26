const mysql = require('mysql2/promise');
require('dotenv').config();

// Create connection pool for enterprise performance and concurrency
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '17929', 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'own_per',
    ssl: {
        rejectUnauthorized: false
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000
});

/**
 * Initialize Database Schema, Tables, and Human-Readable Views
 */
async function initDatabase() {
    try {
        // 1. Create Main `visit_log` Table
        const createTableSQL = `
        CREATE TABLE IF NOT EXISTS \`visit_log\` (
            \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            
            -- Session & Identity
            \`session_id\` VARCHAR(128) NULL COMMENT 'Session / Visitor tracking ID',
            \`visitor_id\` VARCHAR(128) NULL COMMENT 'Client fingerprint / unique visitor ID',
            \`user_id\` VARCHAR(100) NULL COMMENT 'User ID / Admin ID if authenticated',
            \`user_name\` VARCHAR(150) NULL COMMENT 'User / Visitor name if known',
            
            -- Network & IP Intelligence
            \`ip_address\` VARCHAR(45) NOT NULL COMMENT 'Real Client IPv4/IPv6 address',
            \`country\` VARCHAR(64) NULL COMMENT 'Country (Cloudflare / GeoIP)',
            \`city\` VARCHAR(64) NULL COMMENT 'City name',
            \`region\` VARCHAR(64) NULL COMMENT 'State / Region name',
            \`postal_code\` VARCHAR(20) NULL COMMENT 'Postal code',
            \`latitude\` DECIMAL(10, 8) NULL COMMENT 'Latitude coordinate',
            \`longitude\` DECIMAL(11, 8) NULL COMMENT 'Longitude coordinate',
            \`asn\` VARCHAR(100) NULL COMMENT 'ISP / Network provider',
            
            -- Client Hardware & Environment Telemetry
            \`user_agent\` TEXT NULL COMMENT 'Full raw User-Agent header',
            \`browser\` VARCHAR(50) NULL COMMENT 'Browser name (Chrome, Safari, etc.)',
            \`browser_version\` VARCHAR(50) NULL COMMENT 'Browser version',
            \`os\` VARCHAR(50) NULL COMMENT 'Operating System (Windows, macOS, etc.)',
            \`os_version\` VARCHAR(50) NULL COMMENT 'OS version',
            \`device_type\` VARCHAR(30) NULL COMMENT 'desktop, mobile, tablet, bot',
            \`screen_resolution\` VARCHAR(30) NULL COMMENT 'Screen resolution',
            \`is_bot\` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '1 if crawler / bot, 0 otherwise',
            
            -- Request & Traffic Navigation
            \`http_method\` VARCHAR(10) NOT NULL DEFAULT 'GET' COMMENT 'HTTP Method (GET, POST, PUT, DELETE, etc.)',
            \`page_url\` VARCHAR(1024) NOT NULL COMMENT 'Requested URL path or route',
            \`referrer\` VARCHAR(1024) NULL COMMENT 'Traffic source / Referer',
            \`status_code\` SMALLINT UNSIGNED NULL COMMENT 'HTTP response status code',
            \`response_time_ms\` DECIMAL(8, 2) NULL COMMENT 'Server response execution time in ms',
            
            -- Audit Log & Data Change Tracking
            \`event_type\` VARCHAR(50) NOT NULL DEFAULT 'PAGE_VIEW' COMMENT 'PAGE_VIEW, API_CALL, AUDIT_CHANGE, FORM_SUBMISSION, AI_CHAT, ADMIN_ACTION, LOGIN',
            \`action\` VARCHAR(100) NOT NULL DEFAULT 'VISIT' COMMENT 'Specific human-readable action',
            \`entity_type\` VARCHAR(50) NULL COMMENT 'Target entity (e.g. PROJECT, CONTACT, PROFILE, SETTING)',
            \`entity_id\` VARCHAR(100) NULL COMMENT 'ID of affected or modified entity',
            \`old_values\` JSON NULL COMMENT 'Before-change data snapshot in JSON',
            \`new_values\` JSON NULL COMMENT 'After-change data snapshot in JSON',
            \`changes_diff\` JSON NULL COMMENT 'Specific modified field diff in JSON',
            \`request_payload\` JSON NULL COMMENT 'Sanitized request body or parameters in JSON',
            \`metadata\` JSON NULL COMMENT 'Custom additional metadata in JSON',
            
            -- Security & Anomaly Detection
            \`is_threat\` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '1 if security anomaly / SQLi / XSS probe detected',
            \`threat_reason\` VARCHAR(255) NULL COMMENT 'Explanation of threat flag',
            
            -- Timestamps
            \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Audit creation timestamp',
            \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            
            -- Primary Key & High Performance Indexes
            PRIMARY KEY (\`id\`),
            INDEX \`idx_visit_created_at\` (\`created_at\` DESC),
            INDEX \`idx_visit_ip\` (\`ip_address\`),
            INDEX \`idx_visit_event_type\` (\`event_type\`),
            INDEX \`idx_visit_action\` (\`action\`),
            INDEX \`idx_visit_session\` (\`session_id\`),
            INDEX \`idx_visit_visitor\` (\`visitor_id\`),
            INDEX \`idx_visit_entity\` (\`entity_type\`, \`entity_id\`),
            INDEX \`idx_visit_status\` (\`status_code\`),
            INDEX \`idx_visit_is_bot\` (\`is_bot\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Enterprise-grade audit and visit log table';
        `;
        await pool.query(createTableSQL);

        // 2. Create Easy-to-Read SQL VIEW for Traffic Summary (SELECT * FROM v_visit_summary)
        const createSummaryViewSQL = `
        CREATE OR REPLACE VIEW \`v_visit_summary\` AS
        SELECT 
            \`id\` AS \`ID\`,
            DATE_FORMAT(\`created_at\`, '%Y-%m-%d %h:%i:%s %p') AS \`Visit_Time\`,
            \`ip_address\` AS \`IP_Address\`,
            COALESCE(\`country\`, 'India') AS \`Country\`,
            COALESCE(\`city\`, 'Kolkata') AS \`City\`,
            \`device_type\` AS \`Device\`,
            \`browser\` AS \`Browser\`,
            \`os\` AS \`OS\`,
            \`event_type\` AS \`Event_Type\`,
            \`action\` AS \`Action_Performed\`,
            \`page_url\` AS \`Page_or_Route\`,
            \`status_code\` AS \`Status\`,
            CONCAT(COALESCE(\`response_time_ms\`, 0), ' ms') AS \`Response_Time\`
        FROM \`visit_log\`
        ORDER BY \`id\` DESC;
        `;
        await pool.query(createSummaryViewSQL);

        // 3. Create Easy-to-Read SQL VIEW for What Changed (SELECT * FROM v_audit_changes)
        const createChangesViewSQL = `
        CREATE OR REPLACE VIEW \`v_audit_changes\` AS
        SELECT 
            \`id\` AS \`ID\`,
            DATE_FORMAT(\`created_at\`, '%Y-%m-%d %h:%i:%s %p') AS \`Change_Time\`,
            COALESCE(\`user_name\`, 'Anonymous / System') AS \`Who_Changed\`,
            \`ip_address\` AS \`User_IP\`,
            \`action\` AS \`Action\`,
            \`entity_type\` AS \`Modified_Entity\`,
            \`entity_id\` AS \`Record_ID\`,
            \`changes_diff\` AS \`What_Changed_Diff\`,
            \`old_values\` AS \`Old_Data\`,
            \`new_values\` AS \`New_Data\`
        FROM \`visit_log\`
        WHERE \`event_type\` = 'AUDIT_CHANGE' OR \`changes_diff\` IS NOT NULL OR \`event_type\` = 'FORM_SUBMISSION'
        ORDER BY \`id\` DESC;
        `;
        await pool.query(createChangesViewSQL);

        // 4. Create Easy-to-Read SQL VIEW for Daily Analytics (SELECT * FROM v_daily_stats)
        const createDailyStatsViewSQL = `
        CREATE OR REPLACE VIEW \`v_daily_stats\` AS
        SELECT 
            DATE(\`created_at\`) AS \`Date\`,
            COUNT(*) AS \`Total_Events\`,
            COUNT(DISTINCT \`ip_address\`) AS \`Unique_Visitors\`,
            COUNT(CASE WHEN \`event_type\` = 'PAGE_VIEW' THEN 1 END) AS \`Page_Views\`,
            COUNT(CASE WHEN \`event_type\` = 'AI_CHAT' THEN 1 END) AS \`AI_Chats\`,
            COUNT(CASE WHEN \`event_type\` = 'FORM_SUBMISSION' THEN 1 END) AS \`Contact_Forms\`,
            COUNT(CASE WHEN \`event_type\` = 'AUDIT_CHANGE' THEN 1 END) AS \`Data_Modifications\`
        FROM \`visit_log\`
        GROUP BY DATE(\`created_at\`)
        ORDER BY \`Date\` DESC;
        `;
        await pool.query(createDailyStatsViewSQL);

        // 5. Create Dedicated Table for Contact Messages (Send a Direct Message form)
        const createContactMessagesTableSQL = `
        CREATE TABLE IF NOT EXISTS \`contact_messages\` (
            \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            \`name\` VARCHAR(150) NOT NULL COMMENT 'Sender full name',
            \`email\` VARCHAR(150) NOT NULL COMMENT 'Sender email address',
            \`phone\` VARCHAR(50) NULL COMMENT 'Sender phone number (optional)',
            \`message\` TEXT NOT NULL COMMENT 'Message content',
            \`ip_address\` VARCHAR(45) NOT NULL COMMENT 'Sender IP address',
            \`country\` VARCHAR(64) NULL COMMENT 'Country',
            \`city\` VARCHAR(64) NULL COMMENT 'City',
            \`user_agent\` TEXT NULL COMMENT 'Sender User-Agent',
            \`device_type\` VARCHAR(30) NULL DEFAULT 'desktop' COMMENT 'desktop, mobile, tablet',
            \`browser\` VARCHAR(50) NULL COMMENT 'Browser used',
            \`os\` VARCHAR(50) NULL COMMENT 'Operating system',
            \`status\` ENUM('NEW', 'READ', 'REPLIED', 'ARCHIVED') NOT NULL DEFAULT 'NEW' COMMENT 'Message status',
            \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Submission timestamp',
            \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (\`id\`),
            INDEX \`idx_contact_email\` (\`email\`),
            INDEX \`idx_contact_status\` (\`status\`),
            INDEX \`idx_contact_created_at\` (\`created_at\` DESC),
            INDEX \`idx_contact_ip\` (\`ip_address\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Direct contact messages from portfolio website';
        `;
        await pool.query(createContactMessagesTableSQL);

        // 6. Create Easy-to-Read SQL VIEW for Contact Messages (SELECT * FROM v_contact_messages)
        const createContactViewSQL = `
        CREATE OR REPLACE VIEW \`v_contact_messages\` AS
        SELECT 
            \`id\` AS \`ID\`,
            DATE_FORMAT(\`created_at\`, '%Y-%m-%d %h:%i:%s %p') AS \`Submitted_At\`,
            \`name\` AS \`Full_Name\`,
            \`email\` AS \`Email_Address\`,
            COALESCE(\`phone\`, '-') AS \`Phone_Number\`,
            \`message\` AS \`Message\`,
            \`ip_address\` AS \`IP_Address\`,
            CONCAT(COALESCE(\`city\`, 'Kolkata'), ', ', COALESCE(\`country\`, 'India')) AS \`Location\`,
            CONCAT(COALESCE(\`device_type\`, 'desktop'), ' (', COALESCE(\`browser\`, 'Chrome'), ' / ', COALESCE(\`os\`, 'Windows'), ')') AS \`Device_Info\`,
            \`status\` AS \`Lead_Status\`
        FROM \`contact_messages\`
        ORDER BY \`id\` DESC;
        `;
        await pool.query(createContactViewSQL);

        // Clean up previous noisy asset entries if any
        await pool.query(`DELETE FROM \`visit_log\` WHERE \`page_url\` LIKE '%.css%' OR \`page_url\` LIKE '%.js%' OR \`page_url\` LIKE '%.ico%' OR \`page_url\` LIKE '%.png%'`);

        console.log('✅ MySQL Tables `visit_log`, `contact_messages` and Views ready in database:', process.env.DB_NAME);
    } catch (err) {
        console.error('❌ Failed to initialize database schema:', err.message);
    }
}

/**
 * Extract true client IP address, handling Localhost, Cloudflare, AWS, Nginx, Vercel
 */
function getRealClientIp(req) {
    if (!req) return '127.0.0.1';

    // 1. Cloudflare header
    const cfIp = req.headers['cf-connecting-ip'];
    if (cfIp) return cfIp.trim();

    // 2. Standard X-Forwarded-For header
    const forwardedFor = req.headers['x-forwarded-for'];
    if (forwardedFor) {
        const list = forwardedFor.split(',');
        if (list.length > 0 && list[0].trim()) {
            let ip = list[0].trim();
            if (ip.startsWith('::ffff:')) ip = ip.replace('::ffff:', '');
            if (ip === '::1' || ip === '127.0.0.1') return '127.0.0.1 (Localhost)';
            return ip;
        }
    }

    // 3. Reverse proxy headers
    const realIp = req.headers['x-real-ip'] || 
                   req.headers['x-client-ip'] || 
                   req.headers['fastly-client-ip'] || 
                   req.headers['true-client-ip'];
    if (realIp) {
        let ip = realIp.trim();
        if (ip.startsWith('::ffff:')) ip = ip.replace('::ffff:', '');
        if (ip === '::1' || ip === '127.0.0.1') return '127.0.0.1 (Localhost)';
        return ip;
    }

    // 4. Socket address
    let socketIp = req.ip || req.connection?.remoteAddress || req.socket?.remoteAddress || '127.0.0.1';
    if (socketIp.startsWith('::ffff:')) socketIp = socketIp.replace('::ffff:', '');
    if (socketIp === '::1' || socketIp === '127.0.0.1') return '127.0.0.1 (Localhost)';

    return socketIp;
}

/**
 * Intelligent User-Agent and Device Parser
 */
function parseUserAgent(uaString = '') {
    const ua = uaString || '';

    let device_type = 'desktop';
    if (/bot|crawler|spider|googlebot|bingbot|yandex|slurp|duckduckbot|baiduspider|curl|wget|postman/i.test(ua)) {
        device_type = 'bot';
    } else if (/tablet|ipad|playbook|silk/i.test(ua)) {
        device_type = 'tablet';
    } else if (/mobile|iphone|ipod|android.*mobile|blackberry|iemobile|opera mini/i.test(ua)) {
        device_type = 'mobile';
    }

    const is_bot = device_type === 'bot' || 
                   /bot|crawl|spider|mediapartners|slurp|facebookexternalhit|whatsapp|telegrambot|twitterbot|headlesschrome|axios|python-requests|node-fetch/i.test(ua);

    let browser = 'Unknown';
    let browser_version = '';
    
    if (/edg\/([\d.]+)/i.test(ua)) {
        browser = 'Edge';
        browser_version = ua.match(/edg\/([\d.]+)/i)?.[1] || '';
    } else if (/opr\/([\d.]+)|opera\/([\d.]+)/i.test(ua)) {
        browser = 'Opera';
        browser_version = ua.match(/(?:opr|opera)\/([\d.]+)/i)?.[1] || '';
    } else if (/chrome\/([\d.]+)/i.test(ua) && !/chromium/i.test(ua)) {
        browser = 'Chrome';
        browser_version = ua.match(/chrome\/([\d.]+)/i)?.[1] || '';
    } else if (/safari\/([\d.]+)/i.test(ua) && !/chrome/i.test(ua)) {
        browser = 'Safari';
        browser_version = ua.match(/version\/([\d.]+)/i)?.[1] || '';
    } else if (/firefox\/([\d.]+)/i.test(ua)) {
        browser = 'Firefox';
        browser_version = ua.match(/firefox\/([\d.]+)/i)?.[1] || '';
    } else if (/msie\s([\d.]+)|trident\/.*rv:([\d.]+)/i.test(ua)) {
        browser = 'Internet Explorer';
        browser_version = ua.match(/(?:msie\s|rv:)([\d.]+)/i)?.[1] || '';
    } else if (is_bot) {
        browser = 'Bot / Crawler';
    }

    let os = 'Unknown';
    let os_version = '';

    if (/windows nt 10.0/i.test(ua)) {
        os = 'Windows';
        os_version = '10 / 11';
    } else if (/windows nt 6.3/i.test(ua)) {
        os = 'Windows';
        os_version = '8.1';
    } else if (/windows nt 6.1/i.test(ua)) {
        os = 'Windows';
        os_version = '7';
    } else if (/windows nt/i.test(ua)) {
        os = 'Windows';
    } else if (/android\s([\d.]+)/i.test(ua)) {
        os = 'Android';
        os_version = ua.match(/android\s([\d.]+)/i)?.[1] || '';
    } else if (/iphone os\s([\d_]+)/i.test(ua) || /ipad.*os\s([\d_]+)/i.test(ua)) {
        os = 'iOS';
        os_version = (ua.match(/os\s([\d_]+)/i)?.[1] || '').replace(/_/g, '.');
    } else if (/mac os x\s([\d_]+)/i.test(ua)) {
        os = 'macOS';
        os_version = (ua.match(/mac os x\s([\d_]+)/i)?.[1] || '').replace(/_/g, '.');
    } else if (/linux/i.test(ua)) {
        os = 'Linux';
    }

    return {
        browser,
        browser_version,
        os,
        os_version,
        device_type,
        is_bot: is_bot ? 1 : 0
    };
}

/**
 * Log a Visit / Request to `visit_log` table
 */
async function logVisit(entry = {}) {
    try {
        const sql = `
            INSERT INTO \`visit_log\` (
                \`session_id\`, \`visitor_id\`, \`user_id\`, \`user_name\`,
                \`ip_address\`, \`country\`, \`city\`, \`region\`, \`postal_code\`,
                \`latitude\`, \`longitude\`, \`asn\`,
                \`user_agent\`, \`browser\`, \`browser_version\`, \`os\`, \`os_version\`,
                \`device_type\`, \`screen_resolution\`, \`is_bot\`,
                \`http_method\`, \`page_url\`, \`referrer\`, \`status_code\`, \`response_time_ms\`,
                \`event_type\`, \`action\`, \`entity_type\`, \`entity_id\`,
                \`old_values\`, \`new_values\`, \`changes_diff\`, \`request_payload\`, \`metadata\`,
                \`is_threat\`, \`threat_reason\`
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const sanitizeJson = (val) => (val ? JSON.stringify(val) : null);

        // Friendly default geo location for localhost
        let country = entry.country;
        let city = entry.city;
        if (!country && (entry.ip_address === '127.0.0.1 (Localhost)' || entry.ip_address === '127.0.0.1' || entry.ip_address === '::1')) {
            country = 'Local / India';
            city = 'Kolkata';
        }

        const params = [
            entry.session_id || null,
            entry.visitor_id || null,
            entry.user_id || null,
            entry.user_name || null,
            entry.ip_address || '127.0.0.1',
            country || null,
            city || null,
            entry.region || null,
            entry.postal_code || null,
            entry.latitude || null,
            entry.longitude || null,
            entry.asn || null,
            entry.user_agent || null,
            entry.browser || null,
            entry.browser_version || null,
            entry.os || null,
            entry.os_version || null,
            entry.device_type || 'desktop',
            entry.screen_resolution || null,
            entry.is_bot !== undefined ? entry.is_bot : 0,
            entry.http_method || 'GET',
            entry.page_url || '/',
            entry.referrer || null,
            entry.status_code || 200,
            entry.response_time_ms || null,
            entry.event_type || 'PAGE_VIEW',
            entry.action || 'VISIT',
            entry.entity_type || null,
            entry.entity_id || null,
            sanitizeJson(entry.old_values),
            sanitizeJson(entry.new_values),
            sanitizeJson(entry.changes_diff),
            sanitizeJson(entry.request_payload),
            sanitizeJson(entry.metadata),
            entry.is_threat ? 1 : 0,
            entry.threat_reason || null
        ];

        const [result] = await pool.query(sql, params);
        return result.insertId;
    } catch (err) {
        console.error('❌ Failed to insert visit_log:', err.message);
        return null;
    }
}

/**
 * Log an Audit Data Change (Insert, Update, Delete, Config Change)
 */
async function logAuditChange({
    req = null,
    sessionId = null,
    userId = null,
    userName = null,
    ipAddress = null,
    action = 'DATA_CHANGE',
    entityType = null,
    entityId = null,
    oldValues = null,
    newValues = null,
    changesDiff = null,
    requestPayload = null,
    metadata = null
}) {
    let finalIp = ipAddress;
    let uaString = null;
    let pageUrl = '/';
    let httpMethod = 'POST';

    if (req) {
        finalIp = finalIp || getRealClientIp(req);
        uaString = req.headers['user-agent'] || '';
        pageUrl = req.originalUrl || req.url || '/';
        httpMethod = req.method || 'POST';
    }

    const uaDetails = parseUserAgent(uaString);

    // Compute diff automatically
    let calculatedDiff = changesDiff;
    if (!calculatedDiff && oldValues && newValues && typeof oldValues === 'object' && typeof newValues === 'object') {
        calculatedDiff = {};
        const allKeys = new Set([...Object.keys(oldValues), ...Object.keys(newValues)]);
        for (const key of allKeys) {
            if (JSON.stringify(oldValues[key]) !== JSON.stringify(newValues[key])) {
                calculatedDiff[key] = {
                    from: oldValues[key],
                    to: newValues[key]
                };
            }
        }
    }

    return await logVisit({
        session_id: sessionId,
        user_id: userId,
        user_name: userName,
        ip_address: finalIp || '127.0.0.1 (Localhost)',
        country: req?.headers?.['cf-ipcountry'] || 'India',
        city: 'Kolkata',
        user_agent: uaString,
        browser: uaDetails.browser,
        browser_version: uaDetails.browser_version,
        os: uaDetails.os,
        os_version: uaDetails.os_version,
        device_type: uaDetails.device_type,
        is_bot: uaDetails.is_bot,
        http_method: httpMethod,
        page_url: pageUrl,
        referrer: req?.headers?.referer || req?.headers?.referrer || null,
        status_code: 200,
        event_type: 'AUDIT_CHANGE',
        action: action,
        entity_type: entityType,
        entity_id: String(entityId || ''),
        old_values: oldValues,
        new_values: newValues,
        changes_diff: calculatedDiff,
        request_payload: requestPayload,
        metadata: metadata
    });
}

// In-memory debounce cache to prevent duplicate page visits within 3 minutes from same IP/Session
const recentVisitsCache = new Map();
const DEBOUNCE_WINDOW_MS = 3 * 60 * 1000; // 3 minutes

function isDuplicateVisit(key) {
    const now = Date.now();
    const lastVisit = recentVisitsCache.get(key);
    if (lastVisit && (now - lastVisit) < DEBOUNCE_WINDOW_MS) {
        return true;
    }
    recentVisitsCache.set(key, now);
    
    // Auto cleanup old keys
    if (recentVisitsCache.size > 1000) {
        for (const [k, time] of recentVisitsCache.entries()) {
            if (now - time > DEBOUNCE_WINDOW_MS) recentVisitsCache.delete(k);
        }
    }
    return false;
}

function parseCookies(cookieHeader = '') {
    const list = {};
    if (!cookieHeader) return list;
    cookieHeader.split(';').forEach(cookie => {
        let [name, ...rest] = cookie.split('=');
        name = name?.trim();
        if (!name) return;
        const value = rest.join('=').trim();
        list[name] = decodeURIComponent(value);
    });
    return list;
}

/**
 * Express Middleware to Automatically Log All HTTP Requests & Telemetry Cleanly
 */
function auditMiddleware(options = {}) {
    return (req, res, next) => {
        const rawUrl = req.originalUrl || req.url;
        const cleanPath = rawUrl.split('?')[0].toLowerCase();

        // 1. STRICT FILTER: Skip all static assets (CSS, JS, Images, Fonts, PDFs, Favicons, Maps)
        if (/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|map|pdf|mp3|mp4|webp)$/i.test(cleanPath)) {
            return next();
        }

        // 2. SKIP Internal endpoints, Admin dashboard, Health check & internal data fetches
        if (
            cleanPath.startsWith('/api/telemetry') || 
            cleanPath.startsWith('/api/admin') || 
            cleanPath === '/health' ||
            cleanPath === '/admin-audit.html' ||
            cleanPath === '/api/projects' // Read-only project data loading
        ) {
            return next();
        }

        const ip = getRealClientIp(req);
        const ua = req.headers['user-agent'] || '';
        const uaDetails = parseUserAgent(ua);
        const country = req.headers['cf-ipcountry'] || req.headers['x-country-code'] || (ip.includes('Localhost') ? 'India' : null);
        const city = ip.includes('Localhost') ? 'Kolkata' : null;

        const cookies = parseCookies(req.headers.cookie);
        const sessionId = req.headers['x-session-id'] || cookies.sessionId || null;
        const visitorId = req.headers['x-visitor-id'] || cookies.visitorId || null;
        const screenResolution = req.headers['x-screen-resolution'] || null;

        // 3. DEBOUNCE HOMEPAGE VISITS: Don't log duplicate rows if refreshed within 3 minutes
        const isHomePage = cleanPath === '/' || cleanPath === '/index.html';
        if (isHomePage) {
            const debounceKey = `${ip}_${sessionId || 'default'}_home`;
            if (isDuplicateVisit(debounceKey)) {
                return next(); // Skip duplicate page hit within 3 minutes
            }
        }

        const startTime = process.hrtime();

        // Capture response finish
        res.on('finish', () => {
            const diff = process.hrtime(startTime);
            const responseTimeMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);

            let eventType = 'PAGE_VIEW';
            let action = 'VISIT_PAGE';

            if (isHomePage) {
                eventType = 'PAGE_VIEW';
                action = 'VISIT_HOMEPAGE';
            } else if (cleanPath.startsWith('/api/chat/stream')) {
                eventType = 'AI_CHAT';
                action = 'APEX_AI_STREAM_CHAT';
            } else if (cleanPath.startsWith('/api/chat')) {
                eventType = 'AI_CHAT';
                action = 'APEX_AI_QUERY';
            } else if (cleanPath.startsWith('/contact')) {
                eventType = 'FORM_SUBMISSION';
                action = 'SUBMIT_CONTACT_FORM';
            } else if (cleanPath.startsWith('/api/')) {
                eventType = 'API_CALL';
                action = `API_${req.method}_${cleanPath.replace(/\//g, '_')}`;
            }

            // Sanitize payload
            let sanitizedBody = null;
            if (req.body && Object.keys(req.body).length > 0) {
                sanitizedBody = { ...req.body };
                delete sanitizedBody.password;
                delete sanitizedBody.token;
                delete sanitizedBody.apiKey;
            }

            logVisit({
                session_id: sessionId,
                visitor_id: visitorId,
                ip_address: ip,
                country: country,
                city: city,
                user_agent: ua,
                browser: uaDetails.browser,
                browser_version: uaDetails.browser_version,
                os: uaDetails.os,
                os_version: uaDetails.os_version,
                device_type: uaDetails.device_type,
                screen_resolution: screenResolution,
                is_bot: uaDetails.is_bot,
                http_method: req.method,
                page_url: rawUrl,
                referrer: req.headers['referer'] || req.headers['referrer'] || null,
                status_code: res.statusCode,
                response_time_ms: parseFloat(responseTimeMs),
                event_type: eventType,
                action: action,
                request_payload: sanitizedBody
            }).catch(e => console.error('Audit middleware error:', e.message));
        });

        next();
    };
}

/**
 * Fetch Audit Logs with filtering and pagination
 */
async function getVisitLogs({
    limit = 50,
    offset = 0,
    eventType = null,
    ipAddress = null,
    action = null,
    search = null
} = {}) {
    let whereClauses = [];
    let params = [];

    if (eventType) {
        whereClauses.push('`event_type` = ?');
        params.push(eventType);
    }
    if (ipAddress) {
        whereClauses.push('`ip_address` LIKE ?');
        params.push(`%${ipAddress}%`);
    }
    if (action) {
        whereClauses.push('`action` = ?');
        params.push(action);
    }
    if (search) {
        whereClauses.push('(`page_url` LIKE ? OR `user_name` LIKE ? OR `action` LIKE ? OR `ip_address` LIKE ?)');
        const searchPattern = `%${search}%`;
        params.push(searchPattern, searchPattern, searchPattern, searchPattern);
    }

    const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const sql = `
        SELECT 
            \`id\`, \`session_id\`, \`visitor_id\`, \`user_id\`, \`user_name\`,
            \`ip_address\`, \`country\`, \`city\`,
            \`browser\`, \`os\`, \`device_type\`, \`screen_resolution\`, \`is_bot\`,
            \`http_method\`, \`page_url\`, \`referrer\`, \`status_code\`, \`response_time_ms\`,
            \`event_type\`, \`action\`, \`entity_type\`, \`entity_id\`,
            \`old_values\`, \`new_values\`, \`changes_diff\`, \`request_payload\`, \`metadata\`,
            \`created_at\`
        FROM \`visit_log\`
        ${whereSQL}
        ORDER BY \`id\` DESC
        LIMIT ? OFFSET ?
    `;

    params.push(parseInt(limit, 10), parseInt(offset, 10));

    const [rows] = await pool.query(sql, params);
    
    // Count total rows
    const countSql = `SELECT COUNT(*) as total FROM \`visit_log\` ${whereSQL}`;
    const [countResult] = await pool.query(countSql, params.slice(0, -2));
    const total = countResult[0]?.total || 0;

    return {
        logs: rows,
        total,
        limit,
        offset
    };
}

/**
 * Fetch Audit & Traffic Statistics
 */
async function getVisitStats() {
    try {
        const [totalVisits] = await pool.query('SELECT COUNT(*) as count FROM `visit_log`');
        const [uniqueIps] = await pool.query('SELECT COUNT(DISTINCT `ip_address`) as count FROM `visit_log`');
        const [todayVisits] = await pool.query('SELECT COUNT(*) as count FROM `visit_log` WHERE DATE(`created_at`) = CURDATE()');
        const [eventBreakdown] = await pool.query('SELECT `event_type`, COUNT(*) as count FROM `visit_log` GROUP BY `event_type` ORDER BY count DESC');
        const [deviceBreakdown] = await pool.query('SELECT `device_type`, COUNT(*) as count FROM `visit_log` GROUP BY `device_type` ORDER BY count DESC');
        const [browserBreakdown] = await pool.query('SELECT `browser`, COUNT(*) as count FROM `visit_log` WHERE `browser` IS NOT NULL GROUP BY `browser` ORDER BY count DESC LIMIT 5');
        const [topPages] = await pool.query('SELECT `page_url`, COUNT(*) as count FROM `visit_log` GROUP BY `page_url` ORDER BY count DESC LIMIT 10');
        const [recentAudits] = await pool.query("SELECT `id`, `action`, `entity_type`, `entity_id`, `ip_address`, `user_name`, `created_at`, `changes_diff` FROM `visit_log` WHERE `event_type` = 'AUDIT_CHANGE' OR `changes_diff` IS NOT NULL ORDER BY `id` DESC LIMIT 10");

        return {
            total_visits: totalVisits[0]?.count || 0,
            unique_visitors: uniqueIps[0]?.count || 0,
            today_visits: todayVisits[0]?.count || 0,
            event_breakdown: eventBreakdown,
            device_breakdown: deviceBreakdown,
            browser_breakdown: browserBreakdown,
            top_pages: topPages,
            recent_audits: recentAudits
        };
    } catch (err) {
        console.error('❌ Failed to calculate visit stats:', err.message);
        return null;
    }
}

/**
 * Save a Direct Contact Message to `contact_messages` table
 */
async function saveContactMessage({
    name,
    email,
    phone = null,
    message,
    ip_address = '127.0.0.1 (Localhost)',
    country = 'India',
    city = 'Kolkata',
    user_agent = null,
    device_type = 'desktop',
    browser = 'Unknown',
    os = 'Unknown'
}) {
    try {
        const sql = `
            INSERT INTO \`contact_messages\` (
                \`name\`, \`email\`, \`phone\`, \`message\`,
                \`ip_address\`, \`country\`, \`city\`, \`user_agent\`,
                \`device_type\`, \`browser\`, \`os\`, \`status\`
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'NEW')
        `;

        const params = [
            name,
            email,
            phone || null,
            message,
            ip_address,
            country || 'India',
            city || 'Kolkata',
            user_agent,
            device_type || 'desktop',
            browser || 'Unknown',
            os || 'Unknown'
        ];

        const [result] = await pool.query(sql, params);
        return result.insertId;
    } catch (err) {
        console.error('❌ Failed to save contact message to database:', err.message);
        throw err;
    }
}

/**
 * Fetch Contact Messages with filtering and pagination
 */
async function getContactMessages({
    limit = 50,
    offset = 0,
    status = null,
    search = null
} = {}) {
    try {
        let whereClauses = [];
        let params = [];

        if (status) {
            whereClauses.push('`status` = ?');
            params.push(status);
        }
        if (search) {
            whereClauses.push('(`name` LIKE ? OR `email` LIKE ? OR `phone` LIKE ? OR `message` LIKE ? OR `ip_address` LIKE ?)');
            const searchPattern = `%${search}%`;
            params.push(searchPattern, searchPattern, searchPattern, searchPattern, searchPattern);
        }

        const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

        const sql = `
            SELECT 
                \`id\`, \`name\`, \`email\`, \`phone\`, \`message\`,
                \`ip_address\`, \`country\`, \`city\`,
                \`device_type\`, \`browser\`, \`os\`,
                \`status\`, \`created_at\`
            FROM \`contact_messages\`
            ${whereSQL}
            ORDER BY \`id\` DESC
            LIMIT ? OFFSET ?
        `;

        params.push(parseInt(limit, 10), parseInt(offset, 10));

        const [rows] = await pool.query(sql, params);
        
        // Count total rows
        const countSql = `SELECT COUNT(*) as total FROM \`contact_messages\` ${whereSQL}`;
        const [countResult] = await pool.query(countSql, params.slice(0, -2));
        const total = countResult[0]?.total || 0;

        return {
            messages: rows,
            total,
            limit,
            offset
        };
    } catch (err) {
        console.error('❌ Failed to get contact messages:', err.message);
        return { messages: [], total: 0 };
    }
}

/**
 * Update Message Status (NEW, READ, REPLIED, ARCHIVED)
 */
async function updateContactStatus(id, status) {
    try {
        const sql = 'UPDATE `contact_messages` SET `status` = ? WHERE `id` = ?';
        const [result] = await pool.query(sql, [status, id]);
        return result.affectedRows > 0;
    } catch (err) {
        console.error('❌ Failed to update contact status:', err.message);
        return false;
    }
}

module.exports = {
    pool,
    initDatabase,
    getRealClientIp,
    parseUserAgent,
    logVisit,
    logAuditChange,
    auditMiddleware,
    getVisitLogs,
    getVisitStats,
    saveContactMessage,
    getContactMessages,
    updateContactStatus
};

