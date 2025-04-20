import { z } from 'zod';
import { $Enums } from '../prisma';


export const remoteConfigSchema = z.object({
    v1_min_frontend_log_level: z.enum(
        Object.values($Enums.backend_event_logs_error_level) as [
            keyof typeof $Enums.backend_event_logs_error_level,
            ...(keyof typeof $Enums.backend_event_logs_error_level)[],
        ],
    ),
    v1_min_backend_log_level: z.enum(
        Object.values($Enums.backend_event_logs_error_level) as [
            keyof typeof $Enums.backend_event_logs_error_level,
            ...(keyof typeof $Enums.backend_event_logs_error_level)[],
        ],
    ),
    v1_spot_visits_max_version_major: z.string(),
    v1_spot_guides_max_version_major: z.string(),
});

export type RemoteConfigValues = z.infer<typeof remoteConfigSchema>;