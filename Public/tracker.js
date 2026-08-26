/**
 * ⚡ Real-Time Visitor Telemetry & Audit Tracker (Clean & Non-Spamming)
 * Sets persistent visitor tracking and logs explicit user events (CV Downloads, Form Submits)
 */
(function() {
    // 1. Generate or retrieve persistent Visitor ID
    let visitorId = localStorage.getItem('rupam_vid');
    if (!visitorId) {
        visitorId = 'vis_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
        localStorage.setItem('rupam_vid', visitorId);
    }

    // 2. Generate or retrieve tab Session ID
    let sessionId = sessionStorage.getItem('rupam_sid');
    if (!sessionId) {
        sessionId = 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
        sessionStorage.setItem('rupam_sid', sessionId);
    }

    const screenResolution = `${window.screen.width}x${window.screen.height}`;

    // Set cookie so server middleware picks it up automatically on normal page visits
    document.cookie = `sessionId=${sessionId}; path=/; SameSite=Lax`;
    document.cookie = `visitorId=${visitorId}; path=/; SameSite=Lax`;

    // Helper: Send explicit user action to backend
    function trackEvent(action, eventType = 'PAGE_VIEW', metadata = null, entityType = null, entityId = null) {
        try {
            const payload = {
                session_id: sessionId,
                visitor_id: visitorId,
                screen_resolution: screenResolution,
                action: action,
                event_type: eventType,
                page_url: window.location.pathname + window.location.hash,
                referrer: document.referrer || null,
                entity_type: entityType,
                entity_id: entityId,
                metadata: {
                    ...metadata,
                    language: navigator.language || navigator.userLanguage,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    timestamp: new Date().toISOString()
                }
            };

            if (navigator.sendBeacon) {
                const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
                navigator.sendBeacon('/api/telemetry/event', blob);
            } else {
                fetch('/api/telemetry/event', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                }).catch(() => {});
            }
        } catch (e) {
            // Silently ignore tracking errors
        }
    }

    // Expose globally for manual calls
    window.trackAuditAction = trackEvent;

    // Attach listeners ONLY to explicit user actions (No scroll spam, No duplicate page views)
    window.addEventListener('DOMContentLoaded', () => {
        // Track resume / CV download button clicks
        document.querySelectorAll('a[href*=".pdf"], a[download], .btn-resume').forEach(btn => {
            btn.addEventListener('click', () => {
                trackEvent('DOWNLOAD_CV_RESUME', 'PAGE_VIEW', { file: btn.getAttribute('href') });
            });
        });

        // Track external social link clicks
        document.querySelectorAll('a[href*="linkedin.com"], a[href*="github.com"]').forEach(link => {
            link.addEventListener('click', () => {
                const href = link.getAttribute('href');
                trackEvent('CLICK_SOCIAL_LINK', 'PAGE_VIEW', { destination: href });
            });
        });
    });
})();
