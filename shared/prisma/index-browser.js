
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.Backend_event_logsScalarFieldEnum = {
  id: 'id',
  event_name: 'event_name',
  error_level: 'error_level',
  function_name: 'function_name',
  user_id: 'user_id',
  payload: 'payload',
  request_id: 'request_id',
  created_at: 'created_at',
  created_commit_id: 'created_commit_id'
};

exports.Prisma.Ext_spotsScalarFieldEnum = {
  id: 'id',
  vision_detection_type: 'vision_detection_type',
  title: 'title',
  image_url: 'image_url',
  landmark_latitude: 'landmark_latitude',
  landmark_longitude: 'landmark_longitude',
  is_recommendable: 'is_recommendable',
  created_at: 'created_at',
  lock_no: 'lock_no'
};

exports.Prisma.External_api_logsScalarFieldEnum = {
  id: 'id',
  request_id: 'request_id',
  function_name: 'function_name',
  api_name: 'api_name',
  endpoint: 'endpoint',
  request_payload: 'request_payload',
  response_payload: 'response_payload',
  status_code: 'status_code',
  error_message: 'error_message',
  response_time_ms: 'response_time_ms',
  user_id: 'user_id',
  created_at: 'created_at',
  created_commit_id: 'created_commit_id'
};

exports.Prisma.Frontend_event_logsScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  event_name: 'event_name',
  error_level: 'error_level',
  path_name: 'path_name',
  payload: 'payload',
  created_at: 'created_at',
  created_app_version: 'created_app_version',
  created_commit_id: 'created_commit_id'
};

exports.Prisma.Prompt_familiesScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  purpose: 'purpose',
  weight: 'weight'
};

exports.Prisma.Prompt_usagesScalarFieldEnum = {
  id: 'id',
  family_id: 'family_id',
  variant_id: 'variant_id',
  target_type: 'target_type',
  target_id: 'target_id',
  generated_text: 'generated_text',
  used_prompt_text: 'used_prompt_text',
  input_data: 'input_data',
  llm_model: 'llm_model',
  temperature: 'temperature',
  generated_by: 'generated_by',
  created_at: 'created_at',
  metadata: 'metadata'
};

exports.Prisma.Prompt_variantsScalarFieldEnum = {
  id: 'id',
  family_id: 'family_id',
  variant_number: 'variant_number',
  prompt_text: 'prompt_text',
  improvement_note: 'improvement_note',
  created_by: 'created_by',
  metadata: 'metadata'
};

exports.Prisma.ReactionsScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  target_type: 'target_type',
  target_id: 'target_id',
  action_type: 'action_type',
  created_at: 'created_at',
  created_version: 'created_version',
  lock_no: 'lock_no'
};

exports.Prisma.Spot_guidesScalarFieldEnum = {
  id: 'id',
  spot_id: 'spot_id',
  language_tag: 'language_tag',
  title: 'title',
  manuscript: 'manuscript',
  audio_storage_path: 'audio_storage_path',
  voice_type: 'voice_type',
  tags: 'tags',
  price_amount: 'price_amount',
  currency: 'currency',
  recommendation_weight: 'recommendation_weight',
  min_version_major: 'min_version_major',
  max_version_major: 'max_version_major',
  created_by: 'created_by',
  created_at: 'created_at',
  created_request_id: 'created_request_id',
  lock_no: 'lock_no'
};

exports.Prisma.Spot_visitsScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  spot_id: 'spot_id',
  represent_guide_id: 'represent_guide_id',
  taken_photo_storage_path: 'taken_photo_storage_path',
  prev_spot_id: 'prev_spot_id',
  time_gap_minutes: 'time_gap_minutes',
  min_version_major: 'min_version_major',
  max_version_major: 'max_version_major',
  created_at: 'created_at',
  updated_at: 'updated_at',
  lock_no: 'lock_no'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.backend_event_logs_error_level = exports.$Enums.backend_event_logs_error_level = {
  trace: 'trace',
  debug: 'debug',
  info: 'info',
  warn: 'warn',
  error: 'error'
};

exports.ext_spots_vision_detection_type = exports.$Enums.ext_spots_vision_detection_type = {
  LANDMARK_DETECTION: 'LANDMARK_DETECTION',
  WEB_DETECTION: 'WEB_DETECTION'
};

exports.frontend_event_logs_error_level = exports.$Enums.frontend_event_logs_error_level = {
  trace: 'trace',
  debug: 'debug',
  info: 'info',
  warn: 'warn',
  error: 'error'
};

exports.prompt_families_purpose = exports.$Enums.prompt_families_purpose = {
  spot_guide_manuscript: 'spot_guide_manuscript'
};

exports.prompt_usages_target_type = exports.$Enums.prompt_usages_target_type = {
  spot_guides: 'spot_guides'
};

exports.prompt_usages_generated_by = exports.$Enums.prompt_usages_generated_by = {
  system: 'system'
};

exports.reactions_target_type = exports.$Enums.reactions_target_type = {
  spot_guides: 'spot_guides'
};

exports.reactions_action_type = exports.$Enums.reactions_action_type = {
  like: 'like',
  disLike: 'disLike',
  regenerate: 'regenerate'
};

exports.spot_guides_voice_type = exports.$Enums.spot_guides_voice_type = {
  SSML_VOICE_GENDER_UNSPECIFIED: 'SSML_VOICE_GENDER_UNSPECIFIED',
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  NEUTRAL: 'NEUTRAL'
};

exports.Prisma.ModelName = {
  backend_event_logs: 'backend_event_logs',
  ext_spots: 'ext_spots',
  external_api_logs: 'external_api_logs',
  frontend_event_logs: 'frontend_event_logs',
  prompt_families: 'prompt_families',
  prompt_usages: 'prompt_usages',
  prompt_variants: 'prompt_variants',
  reactions: 'reactions',
  spot_guides: 'spot_guides',
  spot_visits: 'spot_visits'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
