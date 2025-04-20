
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/library.js')


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

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

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




  const path = require('path')

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

exports.Prisma.ConfigScalarFieldEnum = {
  key: 'key',
  value: 'value',
  description: 'description'
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

exports.reactions_action_type = exports.$Enums.reactions_action_type = {
  like: 'like',
  disLike: 'disLike',
  regenerate: 'regenerate'
};

exports.reactions_target_type = exports.$Enums.reactions_target_type = {
  spot_guides: 'spot_guides'
};

exports.Prisma.ModelName = {
  backend_event_logs: 'backend_event_logs',
  config: 'config',
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
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/root/workspace/nanicore-audio-guide/shared/prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "debian-openssl-1.1.x",
        "native": true
      }
    ],
    "previewFeatures": [
      "multiSchema"
    ],
    "sourceFilePath": "/root/workspace/nanicore-audio-guide/functions/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null
  },
  "relativePath": "../../functions/prisma",
  "clientVersion": "6.6.0",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider        = \"prisma-client-js\"\n  output          = \"../../shared/prisma\"\n  previewFeatures = [\"multiSchema\"]\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n  schemas  = [\"dev\"]\n}\n\n/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\nmodel backend_event_logs {\n  id                String                          @id\n  event_name        String?\n  error_level       backend_event_logs_error_level?\n  function_name     String?\n  user_id           String?\n  payload           Json?                           @db.Json\n  request_id        String?\n  created_at        DateTime                        @db.Timestamptz(6)\n  created_commit_id String\n\n  @@index([created_at], map: \"idx_backend_event_logs_created_at\")\n  @@index([error_level], map: \"idx_backend_event_logs_error_level\")\n  @@index([request_id], map: \"idx_backend_event_logs_request_id\")\n  @@schema(\"dev\")\n}\n\n/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\nmodel config {\n  key         String  @id\n  value       String\n  description String?\n\n  @@schema(\"dev\")\n}\n\n/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\nmodel ext_spots {\n  id                                              String                          @id\n  vision_detection_type                           ext_spots_vision_detection_type\n  title                                           String\n  image_url                                       String?\n  landmark_latitude                               Float?\n  landmark_longitude                              Float?\n  is_recommendable                                Boolean\n  created_at                                      DateTime                        @db.Timestamptz(6)\n  lock_no                                         Int\n  spot_guides                                     spot_guides[]\n  spot_visits_spot_visits_prev_spot_idToext_spots spot_visits[]                   @relation(\"spot_visits_prev_spot_idToext_spots\")\n  spot_visits_spot_visits_spot_idToext_spots      spot_visits[]                   @relation(\"spot_visits_spot_idToext_spots\")\n\n  @@index([landmark_latitude], map: \"idx_ext_spots_landmark_latitude\")\n  @@index([landmark_longitude], map: \"idx_ext_spots_landmark_longitude\")\n  @@schema(\"dev\")\n}\n\n/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\nmodel external_api_logs {\n  id                String   @id\n  request_id        String?\n  function_name     String?\n  api_name          String?\n  endpoint          String?\n  request_payload   Json?    @db.Json\n  response_payload  Json?    @db.Json\n  status_code       Int?     @db.SmallInt\n  error_message     String?\n  response_time_ms  Int?\n  user_id           String?\n  created_at        DateTime @db.Timestamptz(6)\n  created_commit_id String\n\n  @@index([created_at], map: \"idx_external_api_logs_created_at\")\n  @@index([request_id], map: \"idx_external_api_logs_request_id\")\n  @@index([status_code], map: \"idx_external_api_logs_status_code\")\n  @@schema(\"dev\")\n}\n\n/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\nmodel frontend_event_logs {\n  id                  String                           @id\n  user_id             String?\n  event_name          String?\n  error_level         frontend_event_logs_error_level?\n  path_name           String?\n  payload             String?\n  created_at          DateTime                         @db.Timestamptz(6)\n  created_app_version String\n  created_commit_id   String\n\n  @@index([created_at], map: \"idx_frontend_event_logs_created_at\")\n  @@index([error_level], map: \"idx_frontend_event_logs_error_level\")\n  @@schema(\"dev\")\n}\n\n/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\nmodel prompt_families {\n  id              String                  @id\n  name            String\n  description     String\n  purpose         prompt_families_purpose\n  weight          Int\n  prompt_variants prompt_variants[]\n\n  @@index([weight], map: \"idx_prompt_families_weight\")\n  @@schema(\"dev\")\n}\n\n/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\nmodel prompt_usages {\n  id               String                    @id\n  family_id        String\n  variant_id       String\n  target_type      prompt_usages_target_type\n  target_id        String\n  generated_text   String\n  used_prompt_text String\n  input_data       Json?\n  llm_model        String\n  temperature      Decimal?                  @db.Decimal(3, 2)\n  generated_by     String\n  created_at       DateTime                  @db.Timestamptz(6)\n  metadata         Json?\n\n  @@index([family_id], map: \"idx_prompt_usages_family_id\")\n  @@index([target_id], map: \"idx_prompt_usages_target_id\")\n  @@index([target_type], map: \"idx_prompt_usages_target_type\")\n  @@index([variant_id], map: \"idx_prompt_usages_variant_id\")\n  @@schema(\"dev\")\n}\n\n/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\nmodel prompt_variants {\n  id               String          @id\n  family_id        String\n  variant_number   Int\n  prompt_text      String\n  improvement_note String?\n  created_by       String\n  metadata         Json?\n  prompt_families  prompt_families @relation(fields: [family_id], references: [id], onDelete: NoAction, onUpdate: NoAction)\n\n  @@unique([family_id, variant_number])\n  @@index([family_id], map: \"idx_prompt_variants_family_id\")\n  @@index([variant_number], map: \"idx_prompt_variants_variant_number\")\n  @@schema(\"dev\")\n}\n\n/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\nmodel reactions {\n  id              String                @id\n  user_id         String\n  target_type     reactions_target_type\n  target_id       String\n  action_type     reactions_action_type\n  created_at      DateTime              @db.Timestamptz(6)\n  created_version String\n  lock_no         Int\n\n  @@index([target_id], map: \"idx_reactions_target_id\")\n  @@schema(\"dev\")\n}\n\n/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\nmodel spot_guides {\n  id                    String        @id\n  spot_id               String\n  language_tag          String\n  title                 String\n  manuscript            String\n  audio_storage_path    String\n  tags                  String[]\n  price_amount          Decimal       @db.Decimal(10, 2)\n  currency              String?\n  recommendation_weight Int\n  min_version_major     Int\n  max_version_major     Int\n  created_by            String\n  created_at            DateTime      @db.Timestamptz(6)\n  created_request_id    String\n  lock_no               Int\n  ext_spots             ext_spots     @relation(fields: [spot_id], references: [id], onDelete: NoAction, onUpdate: NoAction)\n  spot_visits           spot_visits[]\n\n  @@index([language_tag], map: \"idx_spot_guides_language_tag\")\n  @@index([recommendation_weight], map: \"idx_spot_guides_recommendation_weight\")\n  @@index([spot_id], map: \"idx_spot_guides_spot_id\")\n  @@schema(\"dev\")\n}\n\n/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\nmodel spot_visits {\n  id                                            String       @id\n  user_id                                       String\n  spot_id                                       String\n  represent_guide_id                            String?\n  taken_photo_storage_path                      String?\n  prev_spot_id                                  String?\n  time_gap_minutes                              Int?\n  min_version_major                             Int\n  max_version_major                             Int\n  created_at                                    DateTime     @db.Timestamptz(6)\n  updated_at                                    DateTime     @db.Timestamptz(6)\n  lock_no                                       Int\n  ext_spots_spot_visits_prev_spot_idToext_spots ext_spots?   @relation(\"spot_visits_prev_spot_idToext_spots\", fields: [prev_spot_id], references: [id], onDelete: NoAction, onUpdate: NoAction)\n  spot_guides                                   spot_guides? @relation(fields: [represent_guide_id], references: [id], onDelete: NoAction, onUpdate: NoAction)\n  ext_spots_spot_visits_spot_idToext_spots      ext_spots    @relation(\"spot_visits_spot_idToext_spots\", fields: [spot_id], references: [id], onDelete: NoAction, onUpdate: NoAction)\n\n  @@index([prev_spot_id], map: \"idx_spot_visits_prev_spot_id\")\n  @@index([represent_guide_id], map: \"idx_spot_visits_represent_guide_id\")\n  @@index([spot_id], map: \"idx_spot_visits_spot_id\")\n  @@index([user_id], map: \"idx_spot_visits_user_id\")\n  @@schema(\"dev\")\n}\n\nenum backend_event_logs_error_level {\n  trace\n  debug\n  info\n  warn\n  error\n\n  @@schema(\"dev\")\n}\n\nenum ext_spots_vision_detection_type {\n  LANDMARK_DETECTION\n  WEB_DETECTION\n\n  @@schema(\"dev\")\n}\n\nenum frontend_event_logs_error_level {\n  trace\n  debug\n  info\n  warn\n  error\n\n  @@schema(\"dev\")\n}\n\nenum prompt_families_purpose {\n  spot_guide_manuscript\n\n  @@schema(\"dev\")\n}\n\nenum prompt_usages_target_type {\n  spot_guides\n\n  @@schema(\"dev\")\n}\n\nenum reactions_action_type {\n  like\n  disLike\n  regenerate\n\n  @@schema(\"dev\")\n}\n\nenum reactions_target_type {\n  spot_guides\n\n  @@schema(\"dev\")\n}\n",
  "inlineSchemaHash": "94e86200f8378392d447205ffb99b1428fb64236e57c2f4a172156990a0b46e1",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "shared/prisma",
    "prisma",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"backend_event_logs\":{\"dbName\":null,\"schema\":\"dev\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"event_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"error_level\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"backend_event_logs_error_level\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"function_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payload\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":[\"Json\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"request_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_commit_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"},\"config\":{\"dbName\":null,\"schema\":\"dev\",\"fields\":[{\"name\":\"key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"},\"ext_spots\":{\"dbName\":null,\"schema\":\"dev\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"vision_detection_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ext_spots_vision_detection_type\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"landmark_latitude\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"landmark_longitude\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"is_recommendable\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lock_no\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"spot_guides\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"spot_guides\",\"nativeType\":null,\"relationName\":\"ext_spotsTospot_guides\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"spot_visits_spot_visits_prev_spot_idToext_spots\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"spot_visits\",\"nativeType\":null,\"relationName\":\"spot_visits_prev_spot_idToext_spots\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"spot_visits_spot_visits_spot_idToext_spots\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"spot_visits\",\"nativeType\":null,\"relationName\":\"spot_visits_spot_idToext_spots\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"},\"external_api_logs\":{\"dbName\":null,\"schema\":\"dev\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"request_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"function_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"api_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"endpoint\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"request_payload\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":[\"Json\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"response_payload\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":[\"Json\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"SmallInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"error_message\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"response_time_ms\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_commit_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"},\"frontend_event_logs\":{\"dbName\":null,\"schema\":\"dev\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"event_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"error_level\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"frontend_event_logs_error_level\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"path_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payload\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_app_version\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_commit_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"},\"prompt_families\":{\"dbName\":null,\"schema\":\"dev\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"purpose\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"prompt_families_purpose\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"weight\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"prompt_variants\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"prompt_variants\",\"nativeType\":null,\"relationName\":\"prompt_familiesToprompt_variants\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"},\"prompt_usages\":{\"dbName\":null,\"schema\":\"dev\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"family_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"variant_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"target_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"prompt_usages_target_type\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"target_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"generated_text\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"used_prompt_text\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"input_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"llm_model\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"temperature\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"3\",\"2\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"generated_by\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metadata\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"},\"prompt_variants\":{\"dbName\":null,\"schema\":\"dev\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"family_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"variant_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"prompt_text\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"improvement_note\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_by\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metadata\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"prompt_families\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"prompt_families\",\"nativeType\":null,\"relationName\":\"prompt_familiesToprompt_variants\",\"relationFromFields\":[\"family_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"family_id\",\"variant_number\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"family_id\",\"variant_number\"]}],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"},\"reactions\":{\"dbName\":null,\"schema\":\"dev\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"target_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"reactions_target_type\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"target_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"action_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"reactions_action_type\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_version\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lock_no\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"},\"spot_guides\":{\"dbName\":null,\"schema\":\"dev\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"spot_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"language_tag\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"manuscript\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"audio_storage_path\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tags\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"price_amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"10\",\"2\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currency\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"recommendation_weight\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"min_version_major\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"max_version_major\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_by\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_request_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lock_no\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ext_spots\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ext_spots\",\"nativeType\":null,\"relationName\":\"ext_spotsTospot_guides\",\"relationFromFields\":[\"spot_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"spot_visits\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"spot_visits\",\"nativeType\":null,\"relationName\":\"spot_guidesTospot_visits\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"},\"spot_visits\":{\"dbName\":null,\"schema\":\"dev\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"spot_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"represent_guide_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"taken_photo_storage_path\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"prev_spot_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"time_gap_minutes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"min_version_major\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"max_version_major\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lock_no\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ext_spots_spot_visits_prev_spot_idToext_spots\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ext_spots\",\"nativeType\":null,\"relationName\":\"spot_visits_prev_spot_idToext_spots\",\"relationFromFields\":[\"prev_spot_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"spot_guides\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"spot_guides\",\"nativeType\":null,\"relationName\":\"spot_guidesTospot_visits\",\"relationFromFields\":[\"represent_guide_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ext_spots_spot_visits_spot_idToext_spots\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ext_spots\",\"nativeType\":null,\"relationName\":\"spot_visits_spot_idToext_spots\",\"relationFromFields\":[\"spot_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"}},\"enums\":{\"backend_event_logs_error_level\":{\"values\":[{\"name\":\"trace\",\"dbName\":null},{\"name\":\"debug\",\"dbName\":null},{\"name\":\"info\",\"dbName\":null},{\"name\":\"warn\",\"dbName\":null},{\"name\":\"error\",\"dbName\":null}],\"dbName\":null},\"ext_spots_vision_detection_type\":{\"values\":[{\"name\":\"LANDMARK_DETECTION\",\"dbName\":null},{\"name\":\"WEB_DETECTION\",\"dbName\":null}],\"dbName\":null},\"frontend_event_logs_error_level\":{\"values\":[{\"name\":\"trace\",\"dbName\":null},{\"name\":\"debug\",\"dbName\":null},{\"name\":\"info\",\"dbName\":null},{\"name\":\"warn\",\"dbName\":null},{\"name\":\"error\",\"dbName\":null}],\"dbName\":null},\"prompt_families_purpose\":{\"values\":[{\"name\":\"spot_guide_manuscript\",\"dbName\":null}],\"dbName\":null},\"prompt_usages_target_type\":{\"values\":[{\"name\":\"spot_guides\",\"dbName\":null}],\"dbName\":null},\"reactions_action_type\":{\"values\":[{\"name\":\"like\",\"dbName\":null},{\"name\":\"disLike\",\"dbName\":null},{\"name\":\"regenerate\",\"dbName\":null}],\"dbName\":null},\"reactions_target_type\":{\"values\":[{\"name\":\"spot_guides\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-debian-openssl-1.1.x.so.node");
path.join(process.cwd(), "shared/prisma/libquery_engine-debian-openssl-1.1.x.so.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "shared/prisma/schema.prisma")
