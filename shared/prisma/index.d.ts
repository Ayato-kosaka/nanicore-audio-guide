
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model backend_event_logs
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type backend_event_logs = $Result.DefaultSelection<Prisma.$backend_event_logsPayload>
/**
 * Model ext_spots
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type ext_spots = $Result.DefaultSelection<Prisma.$ext_spotsPayload>
/**
 * Model external_api_logs
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type external_api_logs = $Result.DefaultSelection<Prisma.$external_api_logsPayload>
/**
 * Model frontend_event_logs
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type frontend_event_logs = $Result.DefaultSelection<Prisma.$frontend_event_logsPayload>
/**
 * Model spot_guides
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type spot_guides = $Result.DefaultSelection<Prisma.$spot_guidesPayload>
/**
 * Model spot_visits
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type spot_visits = $Result.DefaultSelection<Prisma.$spot_visitsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const backend_event_logs_error_level: {
  trace: 'trace',
  debug: 'debug',
  info: 'info',
  warn: 'warn',
  error: 'error'
};

export type backend_event_logs_error_level = (typeof backend_event_logs_error_level)[keyof typeof backend_event_logs_error_level]


export const ext_spots_source_type: {
  LANDMARK_DETECTION: 'LANDMARK_DETECTION',
  WEB_DETECTION: 'WEB_DETECTION'
};

export type ext_spots_source_type = (typeof ext_spots_source_type)[keyof typeof ext_spots_source_type]


export const frontend_event_logs_error_level: {
  trace: 'trace',
  debug: 'debug',
  info: 'info',
  warn: 'warn',
  error: 'error'
};

export type frontend_event_logs_error_level = (typeof frontend_event_logs_error_level)[keyof typeof frontend_event_logs_error_level]


export const spot_guides_voice_type: {
  SSML_VOICE_GENDER_UNSPECIFIED: 'SSML_VOICE_GENDER_UNSPECIFIED',
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  NEUTRAL: 'NEUTRAL'
};

export type spot_guides_voice_type = (typeof spot_guides_voice_type)[keyof typeof spot_guides_voice_type]

}

export type backend_event_logs_error_level = $Enums.backend_event_logs_error_level

export const backend_event_logs_error_level: typeof $Enums.backend_event_logs_error_level

export type ext_spots_source_type = $Enums.ext_spots_source_type

export const ext_spots_source_type: typeof $Enums.ext_spots_source_type

export type frontend_event_logs_error_level = $Enums.frontend_event_logs_error_level

export const frontend_event_logs_error_level: typeof $Enums.frontend_event_logs_error_level

export type spot_guides_voice_type = $Enums.spot_guides_voice_type

export const spot_guides_voice_type: typeof $Enums.spot_guides_voice_type

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Backend_event_logs
 * const backend_event_logs = await prisma.backend_event_logs.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Backend_event_logs
   * const backend_event_logs = await prisma.backend_event_logs.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.backend_event_logs`: Exposes CRUD operations for the **backend_event_logs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Backend_event_logs
    * const backend_event_logs = await prisma.backend_event_logs.findMany()
    * ```
    */
  get backend_event_logs(): Prisma.backend_event_logsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ext_spots`: Exposes CRUD operations for the **ext_spots** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ext_spots
    * const ext_spots = await prisma.ext_spots.findMany()
    * ```
    */
  get ext_spots(): Prisma.ext_spotsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.external_api_logs`: Exposes CRUD operations for the **external_api_logs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more External_api_logs
    * const external_api_logs = await prisma.external_api_logs.findMany()
    * ```
    */
  get external_api_logs(): Prisma.external_api_logsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.frontend_event_logs`: Exposes CRUD operations for the **frontend_event_logs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Frontend_event_logs
    * const frontend_event_logs = await prisma.frontend_event_logs.findMany()
    * ```
    */
  get frontend_event_logs(): Prisma.frontend_event_logsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.spot_guides`: Exposes CRUD operations for the **spot_guides** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Spot_guides
    * const spot_guides = await prisma.spot_guides.findMany()
    * ```
    */
  get spot_guides(): Prisma.spot_guidesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.spot_visits`: Exposes CRUD operations for the **spot_visits** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Spot_visits
    * const spot_visits = await prisma.spot_visits.findMany()
    * ```
    */
  get spot_visits(): Prisma.spot_visitsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    backend_event_logs: 'backend_event_logs',
    ext_spots: 'ext_spots',
    external_api_logs: 'external_api_logs',
    frontend_event_logs: 'frontend_event_logs',
    spot_guides: 'spot_guides',
    spot_visits: 'spot_visits'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "backend_event_logs" | "ext_spots" | "external_api_logs" | "frontend_event_logs" | "spot_guides" | "spot_visits"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      backend_event_logs: {
        payload: Prisma.$backend_event_logsPayload<ExtArgs>
        fields: Prisma.backend_event_logsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.backend_event_logsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backend_event_logsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.backend_event_logsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backend_event_logsPayload>
          }
          findFirst: {
            args: Prisma.backend_event_logsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backend_event_logsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.backend_event_logsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backend_event_logsPayload>
          }
          findMany: {
            args: Prisma.backend_event_logsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backend_event_logsPayload>[]
          }
          create: {
            args: Prisma.backend_event_logsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backend_event_logsPayload>
          }
          createMany: {
            args: Prisma.backend_event_logsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.backend_event_logsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backend_event_logsPayload>[]
          }
          delete: {
            args: Prisma.backend_event_logsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backend_event_logsPayload>
          }
          update: {
            args: Prisma.backend_event_logsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backend_event_logsPayload>
          }
          deleteMany: {
            args: Prisma.backend_event_logsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.backend_event_logsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.backend_event_logsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backend_event_logsPayload>[]
          }
          upsert: {
            args: Prisma.backend_event_logsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backend_event_logsPayload>
          }
          aggregate: {
            args: Prisma.Backend_event_logsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBackend_event_logs>
          }
          groupBy: {
            args: Prisma.backend_event_logsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Backend_event_logsGroupByOutputType>[]
          }
          count: {
            args: Prisma.backend_event_logsCountArgs<ExtArgs>
            result: $Utils.Optional<Backend_event_logsCountAggregateOutputType> | number
          }
        }
      }
      ext_spots: {
        payload: Prisma.$ext_spotsPayload<ExtArgs>
        fields: Prisma.ext_spotsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ext_spotsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ext_spotsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ext_spotsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ext_spotsPayload>
          }
          findFirst: {
            args: Prisma.ext_spotsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ext_spotsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ext_spotsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ext_spotsPayload>
          }
          findMany: {
            args: Prisma.ext_spotsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ext_spotsPayload>[]
          }
          create: {
            args: Prisma.ext_spotsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ext_spotsPayload>
          }
          createMany: {
            args: Prisma.ext_spotsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ext_spotsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ext_spotsPayload>[]
          }
          delete: {
            args: Prisma.ext_spotsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ext_spotsPayload>
          }
          update: {
            args: Prisma.ext_spotsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ext_spotsPayload>
          }
          deleteMany: {
            args: Prisma.ext_spotsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ext_spotsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ext_spotsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ext_spotsPayload>[]
          }
          upsert: {
            args: Prisma.ext_spotsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ext_spotsPayload>
          }
          aggregate: {
            args: Prisma.Ext_spotsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExt_spots>
          }
          groupBy: {
            args: Prisma.ext_spotsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Ext_spotsGroupByOutputType>[]
          }
          count: {
            args: Prisma.ext_spotsCountArgs<ExtArgs>
            result: $Utils.Optional<Ext_spotsCountAggregateOutputType> | number
          }
        }
      }
      external_api_logs: {
        payload: Prisma.$external_api_logsPayload<ExtArgs>
        fields: Prisma.external_api_logsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.external_api_logsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$external_api_logsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.external_api_logsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$external_api_logsPayload>
          }
          findFirst: {
            args: Prisma.external_api_logsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$external_api_logsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.external_api_logsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$external_api_logsPayload>
          }
          findMany: {
            args: Prisma.external_api_logsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$external_api_logsPayload>[]
          }
          create: {
            args: Prisma.external_api_logsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$external_api_logsPayload>
          }
          createMany: {
            args: Prisma.external_api_logsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.external_api_logsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$external_api_logsPayload>[]
          }
          delete: {
            args: Prisma.external_api_logsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$external_api_logsPayload>
          }
          update: {
            args: Prisma.external_api_logsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$external_api_logsPayload>
          }
          deleteMany: {
            args: Prisma.external_api_logsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.external_api_logsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.external_api_logsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$external_api_logsPayload>[]
          }
          upsert: {
            args: Prisma.external_api_logsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$external_api_logsPayload>
          }
          aggregate: {
            args: Prisma.External_api_logsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExternal_api_logs>
          }
          groupBy: {
            args: Prisma.external_api_logsGroupByArgs<ExtArgs>
            result: $Utils.Optional<External_api_logsGroupByOutputType>[]
          }
          count: {
            args: Prisma.external_api_logsCountArgs<ExtArgs>
            result: $Utils.Optional<External_api_logsCountAggregateOutputType> | number
          }
        }
      }
      frontend_event_logs: {
        payload: Prisma.$frontend_event_logsPayload<ExtArgs>
        fields: Prisma.frontend_event_logsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.frontend_event_logsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$frontend_event_logsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.frontend_event_logsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$frontend_event_logsPayload>
          }
          findFirst: {
            args: Prisma.frontend_event_logsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$frontend_event_logsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.frontend_event_logsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$frontend_event_logsPayload>
          }
          findMany: {
            args: Prisma.frontend_event_logsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$frontend_event_logsPayload>[]
          }
          create: {
            args: Prisma.frontend_event_logsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$frontend_event_logsPayload>
          }
          createMany: {
            args: Prisma.frontend_event_logsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.frontend_event_logsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$frontend_event_logsPayload>[]
          }
          delete: {
            args: Prisma.frontend_event_logsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$frontend_event_logsPayload>
          }
          update: {
            args: Prisma.frontend_event_logsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$frontend_event_logsPayload>
          }
          deleteMany: {
            args: Prisma.frontend_event_logsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.frontend_event_logsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.frontend_event_logsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$frontend_event_logsPayload>[]
          }
          upsert: {
            args: Prisma.frontend_event_logsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$frontend_event_logsPayload>
          }
          aggregate: {
            args: Prisma.Frontend_event_logsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFrontend_event_logs>
          }
          groupBy: {
            args: Prisma.frontend_event_logsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Frontend_event_logsGroupByOutputType>[]
          }
          count: {
            args: Prisma.frontend_event_logsCountArgs<ExtArgs>
            result: $Utils.Optional<Frontend_event_logsCountAggregateOutputType> | number
          }
        }
      }
      spot_guides: {
        payload: Prisma.$spot_guidesPayload<ExtArgs>
        fields: Prisma.spot_guidesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.spot_guidesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spot_guidesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.spot_guidesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spot_guidesPayload>
          }
          findFirst: {
            args: Prisma.spot_guidesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spot_guidesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.spot_guidesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spot_guidesPayload>
          }
          findMany: {
            args: Prisma.spot_guidesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spot_guidesPayload>[]
          }
          create: {
            args: Prisma.spot_guidesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spot_guidesPayload>
          }
          createMany: {
            args: Prisma.spot_guidesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.spot_guidesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spot_guidesPayload>[]
          }
          delete: {
            args: Prisma.spot_guidesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spot_guidesPayload>
          }
          update: {
            args: Prisma.spot_guidesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spot_guidesPayload>
          }
          deleteMany: {
            args: Prisma.spot_guidesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.spot_guidesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.spot_guidesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spot_guidesPayload>[]
          }
          upsert: {
            args: Prisma.spot_guidesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spot_guidesPayload>
          }
          aggregate: {
            args: Prisma.Spot_guidesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpot_guides>
          }
          groupBy: {
            args: Prisma.spot_guidesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Spot_guidesGroupByOutputType>[]
          }
          count: {
            args: Prisma.spot_guidesCountArgs<ExtArgs>
            result: $Utils.Optional<Spot_guidesCountAggregateOutputType> | number
          }
        }
      }
      spot_visits: {
        payload: Prisma.$spot_visitsPayload<ExtArgs>
        fields: Prisma.spot_visitsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.spot_visitsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spot_visitsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.spot_visitsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spot_visitsPayload>
          }
          findFirst: {
            args: Prisma.spot_visitsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spot_visitsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.spot_visitsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spot_visitsPayload>
          }
          findMany: {
            args: Prisma.spot_visitsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spot_visitsPayload>[]
          }
          create: {
            args: Prisma.spot_visitsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spot_visitsPayload>
          }
          createMany: {
            args: Prisma.spot_visitsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.spot_visitsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spot_visitsPayload>[]
          }
          delete: {
            args: Prisma.spot_visitsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spot_visitsPayload>
          }
          update: {
            args: Prisma.spot_visitsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spot_visitsPayload>
          }
          deleteMany: {
            args: Prisma.spot_visitsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.spot_visitsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.spot_visitsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spot_visitsPayload>[]
          }
          upsert: {
            args: Prisma.spot_visitsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spot_visitsPayload>
          }
          aggregate: {
            args: Prisma.Spot_visitsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpot_visits>
          }
          groupBy: {
            args: Prisma.spot_visitsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Spot_visitsGroupByOutputType>[]
          }
          count: {
            args: Prisma.spot_visitsCountArgs<ExtArgs>
            result: $Utils.Optional<Spot_visitsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    backend_event_logs?: backend_event_logsOmit
    ext_spots?: ext_spotsOmit
    external_api_logs?: external_api_logsOmit
    frontend_event_logs?: frontend_event_logsOmit
    spot_guides?: spot_guidesOmit
    spot_visits?: spot_visitsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type Ext_spotsCountOutputType
   */

  export type Ext_spotsCountOutputType = {
    spot_guides: number
    spot_visits_spot_visits_prev_spot_idToext_spots: number
    spot_visits_spot_visits_spot_idToext_spots: number
  }

  export type Ext_spotsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    spot_guides?: boolean | Ext_spotsCountOutputTypeCountSpot_guidesArgs
    spot_visits_spot_visits_prev_spot_idToext_spots?: boolean | Ext_spotsCountOutputTypeCountSpot_visits_spot_visits_prev_spot_idToext_spotsArgs
    spot_visits_spot_visits_spot_idToext_spots?: boolean | Ext_spotsCountOutputTypeCountSpot_visits_spot_visits_spot_idToext_spotsArgs
  }

  // Custom InputTypes
  /**
   * Ext_spotsCountOutputType without action
   */
  export type Ext_spotsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ext_spotsCountOutputType
     */
    select?: Ext_spotsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Ext_spotsCountOutputType without action
   */
  export type Ext_spotsCountOutputTypeCountSpot_guidesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: spot_guidesWhereInput
  }

  /**
   * Ext_spotsCountOutputType without action
   */
  export type Ext_spotsCountOutputTypeCountSpot_visits_spot_visits_prev_spot_idToext_spotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: spot_visitsWhereInput
  }

  /**
   * Ext_spotsCountOutputType without action
   */
  export type Ext_spotsCountOutputTypeCountSpot_visits_spot_visits_spot_idToext_spotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: spot_visitsWhereInput
  }


  /**
   * Count Type Spot_guidesCountOutputType
   */

  export type Spot_guidesCountOutputType = {
    spot_visits: number
  }

  export type Spot_guidesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    spot_visits?: boolean | Spot_guidesCountOutputTypeCountSpot_visitsArgs
  }

  // Custom InputTypes
  /**
   * Spot_guidesCountOutputType without action
   */
  export type Spot_guidesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spot_guidesCountOutputType
     */
    select?: Spot_guidesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Spot_guidesCountOutputType without action
   */
  export type Spot_guidesCountOutputTypeCountSpot_visitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: spot_visitsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model backend_event_logs
   */

  export type AggregateBackend_event_logs = {
    _count: Backend_event_logsCountAggregateOutputType | null
    _min: Backend_event_logsMinAggregateOutputType | null
    _max: Backend_event_logsMaxAggregateOutputType | null
  }

  export type Backend_event_logsMinAggregateOutputType = {
    id: string | null
    event_name: string | null
    error_level: $Enums.backend_event_logs_error_level | null
    function_name: string | null
    user_id: string | null
    request_id: string | null
    created_at: Date | null
    created_commit_id: string | null
  }

  export type Backend_event_logsMaxAggregateOutputType = {
    id: string | null
    event_name: string | null
    error_level: $Enums.backend_event_logs_error_level | null
    function_name: string | null
    user_id: string | null
    request_id: string | null
    created_at: Date | null
    created_commit_id: string | null
  }

  export type Backend_event_logsCountAggregateOutputType = {
    id: number
    event_name: number
    error_level: number
    function_name: number
    user_id: number
    payload: number
    request_id: number
    created_at: number
    created_commit_id: number
    _all: number
  }


  export type Backend_event_logsMinAggregateInputType = {
    id?: true
    event_name?: true
    error_level?: true
    function_name?: true
    user_id?: true
    request_id?: true
    created_at?: true
    created_commit_id?: true
  }

  export type Backend_event_logsMaxAggregateInputType = {
    id?: true
    event_name?: true
    error_level?: true
    function_name?: true
    user_id?: true
    request_id?: true
    created_at?: true
    created_commit_id?: true
  }

  export type Backend_event_logsCountAggregateInputType = {
    id?: true
    event_name?: true
    error_level?: true
    function_name?: true
    user_id?: true
    payload?: true
    request_id?: true
    created_at?: true
    created_commit_id?: true
    _all?: true
  }

  export type Backend_event_logsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which backend_event_logs to aggregate.
     */
    where?: backend_event_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of backend_event_logs to fetch.
     */
    orderBy?: backend_event_logsOrderByWithRelationInput | backend_event_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: backend_event_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` backend_event_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` backend_event_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned backend_event_logs
    **/
    _count?: true | Backend_event_logsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Backend_event_logsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Backend_event_logsMaxAggregateInputType
  }

  export type GetBackend_event_logsAggregateType<T extends Backend_event_logsAggregateArgs> = {
        [P in keyof T & keyof AggregateBackend_event_logs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBackend_event_logs[P]>
      : GetScalarType<T[P], AggregateBackend_event_logs[P]>
  }




  export type backend_event_logsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: backend_event_logsWhereInput
    orderBy?: backend_event_logsOrderByWithAggregationInput | backend_event_logsOrderByWithAggregationInput[]
    by: Backend_event_logsScalarFieldEnum[] | Backend_event_logsScalarFieldEnum
    having?: backend_event_logsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Backend_event_logsCountAggregateInputType | true
    _min?: Backend_event_logsMinAggregateInputType
    _max?: Backend_event_logsMaxAggregateInputType
  }

  export type Backend_event_logsGroupByOutputType = {
    id: string
    event_name: string | null
    error_level: $Enums.backend_event_logs_error_level | null
    function_name: string | null
    user_id: string | null
    payload: JsonValue | null
    request_id: string | null
    created_at: Date
    created_commit_id: string
    _count: Backend_event_logsCountAggregateOutputType | null
    _min: Backend_event_logsMinAggregateOutputType | null
    _max: Backend_event_logsMaxAggregateOutputType | null
  }

  type GetBackend_event_logsGroupByPayload<T extends backend_event_logsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Backend_event_logsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Backend_event_logsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Backend_event_logsGroupByOutputType[P]>
            : GetScalarType<T[P], Backend_event_logsGroupByOutputType[P]>
        }
      >
    >


  export type backend_event_logsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    event_name?: boolean
    error_level?: boolean
    function_name?: boolean
    user_id?: boolean
    payload?: boolean
    request_id?: boolean
    created_at?: boolean
    created_commit_id?: boolean
  }, ExtArgs["result"]["backend_event_logs"]>

  export type backend_event_logsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    event_name?: boolean
    error_level?: boolean
    function_name?: boolean
    user_id?: boolean
    payload?: boolean
    request_id?: boolean
    created_at?: boolean
    created_commit_id?: boolean
  }, ExtArgs["result"]["backend_event_logs"]>

  export type backend_event_logsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    event_name?: boolean
    error_level?: boolean
    function_name?: boolean
    user_id?: boolean
    payload?: boolean
    request_id?: boolean
    created_at?: boolean
    created_commit_id?: boolean
  }, ExtArgs["result"]["backend_event_logs"]>

  export type backend_event_logsSelectScalar = {
    id?: boolean
    event_name?: boolean
    error_level?: boolean
    function_name?: boolean
    user_id?: boolean
    payload?: boolean
    request_id?: boolean
    created_at?: boolean
    created_commit_id?: boolean
  }

  export type backend_event_logsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "event_name" | "error_level" | "function_name" | "user_id" | "payload" | "request_id" | "created_at" | "created_commit_id", ExtArgs["result"]["backend_event_logs"]>

  export type $backend_event_logsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "backend_event_logs"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      event_name: string | null
      error_level: $Enums.backend_event_logs_error_level | null
      function_name: string | null
      user_id: string | null
      payload: Prisma.JsonValue | null
      request_id: string | null
      created_at: Date
      created_commit_id: string
    }, ExtArgs["result"]["backend_event_logs"]>
    composites: {}
  }

  type backend_event_logsGetPayload<S extends boolean | null | undefined | backend_event_logsDefaultArgs> = $Result.GetResult<Prisma.$backend_event_logsPayload, S>

  type backend_event_logsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<backend_event_logsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Backend_event_logsCountAggregateInputType | true
    }

  export interface backend_event_logsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['backend_event_logs'], meta: { name: 'backend_event_logs' } }
    /**
     * Find zero or one Backend_event_logs that matches the filter.
     * @param {backend_event_logsFindUniqueArgs} args - Arguments to find a Backend_event_logs
     * @example
     * // Get one Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends backend_event_logsFindUniqueArgs>(args: SelectSubset<T, backend_event_logsFindUniqueArgs<ExtArgs>>): Prisma__backend_event_logsClient<$Result.GetResult<Prisma.$backend_event_logsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Backend_event_logs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {backend_event_logsFindUniqueOrThrowArgs} args - Arguments to find a Backend_event_logs
     * @example
     * // Get one Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends backend_event_logsFindUniqueOrThrowArgs>(args: SelectSubset<T, backend_event_logsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__backend_event_logsClient<$Result.GetResult<Prisma.$backend_event_logsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Backend_event_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backend_event_logsFindFirstArgs} args - Arguments to find a Backend_event_logs
     * @example
     * // Get one Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends backend_event_logsFindFirstArgs>(args?: SelectSubset<T, backend_event_logsFindFirstArgs<ExtArgs>>): Prisma__backend_event_logsClient<$Result.GetResult<Prisma.$backend_event_logsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Backend_event_logs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backend_event_logsFindFirstOrThrowArgs} args - Arguments to find a Backend_event_logs
     * @example
     * // Get one Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends backend_event_logsFindFirstOrThrowArgs>(args?: SelectSubset<T, backend_event_logsFindFirstOrThrowArgs<ExtArgs>>): Prisma__backend_event_logsClient<$Result.GetResult<Prisma.$backend_event_logsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Backend_event_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backend_event_logsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.findMany()
     * 
     * // Get first 10 Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const backend_event_logsWithIdOnly = await prisma.backend_event_logs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends backend_event_logsFindManyArgs>(args?: SelectSubset<T, backend_event_logsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$backend_event_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Backend_event_logs.
     * @param {backend_event_logsCreateArgs} args - Arguments to create a Backend_event_logs.
     * @example
     * // Create one Backend_event_logs
     * const Backend_event_logs = await prisma.backend_event_logs.create({
     *   data: {
     *     // ... data to create a Backend_event_logs
     *   }
     * })
     * 
     */
    create<T extends backend_event_logsCreateArgs>(args: SelectSubset<T, backend_event_logsCreateArgs<ExtArgs>>): Prisma__backend_event_logsClient<$Result.GetResult<Prisma.$backend_event_logsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Backend_event_logs.
     * @param {backend_event_logsCreateManyArgs} args - Arguments to create many Backend_event_logs.
     * @example
     * // Create many Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends backend_event_logsCreateManyArgs>(args?: SelectSubset<T, backend_event_logsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Backend_event_logs and returns the data saved in the database.
     * @param {backend_event_logsCreateManyAndReturnArgs} args - Arguments to create many Backend_event_logs.
     * @example
     * // Create many Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Backend_event_logs and only return the `id`
     * const backend_event_logsWithIdOnly = await prisma.backend_event_logs.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends backend_event_logsCreateManyAndReturnArgs>(args?: SelectSubset<T, backend_event_logsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$backend_event_logsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Backend_event_logs.
     * @param {backend_event_logsDeleteArgs} args - Arguments to delete one Backend_event_logs.
     * @example
     * // Delete one Backend_event_logs
     * const Backend_event_logs = await prisma.backend_event_logs.delete({
     *   where: {
     *     // ... filter to delete one Backend_event_logs
     *   }
     * })
     * 
     */
    delete<T extends backend_event_logsDeleteArgs>(args: SelectSubset<T, backend_event_logsDeleteArgs<ExtArgs>>): Prisma__backend_event_logsClient<$Result.GetResult<Prisma.$backend_event_logsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Backend_event_logs.
     * @param {backend_event_logsUpdateArgs} args - Arguments to update one Backend_event_logs.
     * @example
     * // Update one Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends backend_event_logsUpdateArgs>(args: SelectSubset<T, backend_event_logsUpdateArgs<ExtArgs>>): Prisma__backend_event_logsClient<$Result.GetResult<Prisma.$backend_event_logsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Backend_event_logs.
     * @param {backend_event_logsDeleteManyArgs} args - Arguments to filter Backend_event_logs to delete.
     * @example
     * // Delete a few Backend_event_logs
     * const { count } = await prisma.backend_event_logs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends backend_event_logsDeleteManyArgs>(args?: SelectSubset<T, backend_event_logsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Backend_event_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backend_event_logsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends backend_event_logsUpdateManyArgs>(args: SelectSubset<T, backend_event_logsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Backend_event_logs and returns the data updated in the database.
     * @param {backend_event_logsUpdateManyAndReturnArgs} args - Arguments to update many Backend_event_logs.
     * @example
     * // Update many Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Backend_event_logs and only return the `id`
     * const backend_event_logsWithIdOnly = await prisma.backend_event_logs.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends backend_event_logsUpdateManyAndReturnArgs>(args: SelectSubset<T, backend_event_logsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$backend_event_logsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Backend_event_logs.
     * @param {backend_event_logsUpsertArgs} args - Arguments to update or create a Backend_event_logs.
     * @example
     * // Update or create a Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.upsert({
     *   create: {
     *     // ... data to create a Backend_event_logs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Backend_event_logs we want to update
     *   }
     * })
     */
    upsert<T extends backend_event_logsUpsertArgs>(args: SelectSubset<T, backend_event_logsUpsertArgs<ExtArgs>>): Prisma__backend_event_logsClient<$Result.GetResult<Prisma.$backend_event_logsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Backend_event_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backend_event_logsCountArgs} args - Arguments to filter Backend_event_logs to count.
     * @example
     * // Count the number of Backend_event_logs
     * const count = await prisma.backend_event_logs.count({
     *   where: {
     *     // ... the filter for the Backend_event_logs we want to count
     *   }
     * })
    **/
    count<T extends backend_event_logsCountArgs>(
      args?: Subset<T, backend_event_logsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Backend_event_logsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Backend_event_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Backend_event_logsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Backend_event_logsAggregateArgs>(args: Subset<T, Backend_event_logsAggregateArgs>): Prisma.PrismaPromise<GetBackend_event_logsAggregateType<T>>

    /**
     * Group by Backend_event_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backend_event_logsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends backend_event_logsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: backend_event_logsGroupByArgs['orderBy'] }
        : { orderBy?: backend_event_logsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, backend_event_logsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBackend_event_logsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the backend_event_logs model
   */
  readonly fields: backend_event_logsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for backend_event_logs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__backend_event_logsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the backend_event_logs model
   */
  interface backend_event_logsFieldRefs {
    readonly id: FieldRef<"backend_event_logs", 'String'>
    readonly event_name: FieldRef<"backend_event_logs", 'String'>
    readonly error_level: FieldRef<"backend_event_logs", 'backend_event_logs_error_level'>
    readonly function_name: FieldRef<"backend_event_logs", 'String'>
    readonly user_id: FieldRef<"backend_event_logs", 'String'>
    readonly payload: FieldRef<"backend_event_logs", 'Json'>
    readonly request_id: FieldRef<"backend_event_logs", 'String'>
    readonly created_at: FieldRef<"backend_event_logs", 'DateTime'>
    readonly created_commit_id: FieldRef<"backend_event_logs", 'String'>
  }
    

  // Custom InputTypes
  /**
   * backend_event_logs findUnique
   */
  export type backend_event_logsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
    /**
     * Filter, which backend_event_logs to fetch.
     */
    where: backend_event_logsWhereUniqueInput
  }

  /**
   * backend_event_logs findUniqueOrThrow
   */
  export type backend_event_logsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
    /**
     * Filter, which backend_event_logs to fetch.
     */
    where: backend_event_logsWhereUniqueInput
  }

  /**
   * backend_event_logs findFirst
   */
  export type backend_event_logsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
    /**
     * Filter, which backend_event_logs to fetch.
     */
    where?: backend_event_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of backend_event_logs to fetch.
     */
    orderBy?: backend_event_logsOrderByWithRelationInput | backend_event_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for backend_event_logs.
     */
    cursor?: backend_event_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` backend_event_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` backend_event_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of backend_event_logs.
     */
    distinct?: Backend_event_logsScalarFieldEnum | Backend_event_logsScalarFieldEnum[]
  }

  /**
   * backend_event_logs findFirstOrThrow
   */
  export type backend_event_logsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
    /**
     * Filter, which backend_event_logs to fetch.
     */
    where?: backend_event_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of backend_event_logs to fetch.
     */
    orderBy?: backend_event_logsOrderByWithRelationInput | backend_event_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for backend_event_logs.
     */
    cursor?: backend_event_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` backend_event_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` backend_event_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of backend_event_logs.
     */
    distinct?: Backend_event_logsScalarFieldEnum | Backend_event_logsScalarFieldEnum[]
  }

  /**
   * backend_event_logs findMany
   */
  export type backend_event_logsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
    /**
     * Filter, which backend_event_logs to fetch.
     */
    where?: backend_event_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of backend_event_logs to fetch.
     */
    orderBy?: backend_event_logsOrderByWithRelationInput | backend_event_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing backend_event_logs.
     */
    cursor?: backend_event_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` backend_event_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` backend_event_logs.
     */
    skip?: number
    distinct?: Backend_event_logsScalarFieldEnum | Backend_event_logsScalarFieldEnum[]
  }

  /**
   * backend_event_logs create
   */
  export type backend_event_logsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
    /**
     * The data needed to create a backend_event_logs.
     */
    data: XOR<backend_event_logsCreateInput, backend_event_logsUncheckedCreateInput>
  }

  /**
   * backend_event_logs createMany
   */
  export type backend_event_logsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many backend_event_logs.
     */
    data: backend_event_logsCreateManyInput | backend_event_logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * backend_event_logs createManyAndReturn
   */
  export type backend_event_logsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
    /**
     * The data used to create many backend_event_logs.
     */
    data: backend_event_logsCreateManyInput | backend_event_logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * backend_event_logs update
   */
  export type backend_event_logsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
    /**
     * The data needed to update a backend_event_logs.
     */
    data: XOR<backend_event_logsUpdateInput, backend_event_logsUncheckedUpdateInput>
    /**
     * Choose, which backend_event_logs to update.
     */
    where: backend_event_logsWhereUniqueInput
  }

  /**
   * backend_event_logs updateMany
   */
  export type backend_event_logsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update backend_event_logs.
     */
    data: XOR<backend_event_logsUpdateManyMutationInput, backend_event_logsUncheckedUpdateManyInput>
    /**
     * Filter which backend_event_logs to update
     */
    where?: backend_event_logsWhereInput
    /**
     * Limit how many backend_event_logs to update.
     */
    limit?: number
  }

  /**
   * backend_event_logs updateManyAndReturn
   */
  export type backend_event_logsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
    /**
     * The data used to update backend_event_logs.
     */
    data: XOR<backend_event_logsUpdateManyMutationInput, backend_event_logsUncheckedUpdateManyInput>
    /**
     * Filter which backend_event_logs to update
     */
    where?: backend_event_logsWhereInput
    /**
     * Limit how many backend_event_logs to update.
     */
    limit?: number
  }

  /**
   * backend_event_logs upsert
   */
  export type backend_event_logsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
    /**
     * The filter to search for the backend_event_logs to update in case it exists.
     */
    where: backend_event_logsWhereUniqueInput
    /**
     * In case the backend_event_logs found by the `where` argument doesn't exist, create a new backend_event_logs with this data.
     */
    create: XOR<backend_event_logsCreateInput, backend_event_logsUncheckedCreateInput>
    /**
     * In case the backend_event_logs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<backend_event_logsUpdateInput, backend_event_logsUncheckedUpdateInput>
  }

  /**
   * backend_event_logs delete
   */
  export type backend_event_logsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
    /**
     * Filter which backend_event_logs to delete.
     */
    where: backend_event_logsWhereUniqueInput
  }

  /**
   * backend_event_logs deleteMany
   */
  export type backend_event_logsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which backend_event_logs to delete
     */
    where?: backend_event_logsWhereInput
    /**
     * Limit how many backend_event_logs to delete.
     */
    limit?: number
  }

  /**
   * backend_event_logs without action
   */
  export type backend_event_logsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
  }


  /**
   * Model ext_spots
   */

  export type AggregateExt_spots = {
    _count: Ext_spotsCountAggregateOutputType | null
    _avg: Ext_spotsAvgAggregateOutputType | null
    _sum: Ext_spotsSumAggregateOutputType | null
    _min: Ext_spotsMinAggregateOutputType | null
    _max: Ext_spotsMaxAggregateOutputType | null
  }

  export type Ext_spotsAvgAggregateOutputType = {
    landmark_latitude: number | null
    landmark_longitude: number | null
    lock_no: number | null
  }

  export type Ext_spotsSumAggregateOutputType = {
    landmark_latitude: number | null
    landmark_longitude: number | null
    lock_no: number | null
  }

  export type Ext_spotsMinAggregateOutputType = {
    id: string | null
    source_type: $Enums.ext_spots_source_type | null
    title: string | null
    image_url: string | null
    landmark_latitude: number | null
    landmark_longitude: number | null
    is_recommendable: boolean | null
    created_at: Date | null
    lock_no: number | null
  }

  export type Ext_spotsMaxAggregateOutputType = {
    id: string | null
    source_type: $Enums.ext_spots_source_type | null
    title: string | null
    image_url: string | null
    landmark_latitude: number | null
    landmark_longitude: number | null
    is_recommendable: boolean | null
    created_at: Date | null
    lock_no: number | null
  }

  export type Ext_spotsCountAggregateOutputType = {
    id: number
    source_type: number
    title: number
    image_url: number
    landmark_latitude: number
    landmark_longitude: number
    is_recommendable: number
    created_at: number
    lock_no: number
    _all: number
  }


  export type Ext_spotsAvgAggregateInputType = {
    landmark_latitude?: true
    landmark_longitude?: true
    lock_no?: true
  }

  export type Ext_spotsSumAggregateInputType = {
    landmark_latitude?: true
    landmark_longitude?: true
    lock_no?: true
  }

  export type Ext_spotsMinAggregateInputType = {
    id?: true
    source_type?: true
    title?: true
    image_url?: true
    landmark_latitude?: true
    landmark_longitude?: true
    is_recommendable?: true
    created_at?: true
    lock_no?: true
  }

  export type Ext_spotsMaxAggregateInputType = {
    id?: true
    source_type?: true
    title?: true
    image_url?: true
    landmark_latitude?: true
    landmark_longitude?: true
    is_recommendable?: true
    created_at?: true
    lock_no?: true
  }

  export type Ext_spotsCountAggregateInputType = {
    id?: true
    source_type?: true
    title?: true
    image_url?: true
    landmark_latitude?: true
    landmark_longitude?: true
    is_recommendable?: true
    created_at?: true
    lock_no?: true
    _all?: true
  }

  export type Ext_spotsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ext_spots to aggregate.
     */
    where?: ext_spotsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ext_spots to fetch.
     */
    orderBy?: ext_spotsOrderByWithRelationInput | ext_spotsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ext_spotsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ext_spots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ext_spots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ext_spots
    **/
    _count?: true | Ext_spotsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Ext_spotsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Ext_spotsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Ext_spotsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Ext_spotsMaxAggregateInputType
  }

  export type GetExt_spotsAggregateType<T extends Ext_spotsAggregateArgs> = {
        [P in keyof T & keyof AggregateExt_spots]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExt_spots[P]>
      : GetScalarType<T[P], AggregateExt_spots[P]>
  }




  export type ext_spotsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ext_spotsWhereInput
    orderBy?: ext_spotsOrderByWithAggregationInput | ext_spotsOrderByWithAggregationInput[]
    by: Ext_spotsScalarFieldEnum[] | Ext_spotsScalarFieldEnum
    having?: ext_spotsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Ext_spotsCountAggregateInputType | true
    _avg?: Ext_spotsAvgAggregateInputType
    _sum?: Ext_spotsSumAggregateInputType
    _min?: Ext_spotsMinAggregateInputType
    _max?: Ext_spotsMaxAggregateInputType
  }

  export type Ext_spotsGroupByOutputType = {
    id: string
    source_type: $Enums.ext_spots_source_type
    title: string
    image_url: string
    landmark_latitude: number
    landmark_longitude: number
    is_recommendable: boolean
    created_at: Date
    lock_no: number
    _count: Ext_spotsCountAggregateOutputType | null
    _avg: Ext_spotsAvgAggregateOutputType | null
    _sum: Ext_spotsSumAggregateOutputType | null
    _min: Ext_spotsMinAggregateOutputType | null
    _max: Ext_spotsMaxAggregateOutputType | null
  }

  type GetExt_spotsGroupByPayload<T extends ext_spotsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Ext_spotsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Ext_spotsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Ext_spotsGroupByOutputType[P]>
            : GetScalarType<T[P], Ext_spotsGroupByOutputType[P]>
        }
      >
    >


  export type ext_spotsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source_type?: boolean
    title?: boolean
    image_url?: boolean
    landmark_latitude?: boolean
    landmark_longitude?: boolean
    is_recommendable?: boolean
    created_at?: boolean
    lock_no?: boolean
    spot_guides?: boolean | ext_spots$spot_guidesArgs<ExtArgs>
    spot_visits_spot_visits_prev_spot_idToext_spots?: boolean | ext_spots$spot_visits_spot_visits_prev_spot_idToext_spotsArgs<ExtArgs>
    spot_visits_spot_visits_spot_idToext_spots?: boolean | ext_spots$spot_visits_spot_visits_spot_idToext_spotsArgs<ExtArgs>
    _count?: boolean | Ext_spotsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ext_spots"]>

  export type ext_spotsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source_type?: boolean
    title?: boolean
    image_url?: boolean
    landmark_latitude?: boolean
    landmark_longitude?: boolean
    is_recommendable?: boolean
    created_at?: boolean
    lock_no?: boolean
  }, ExtArgs["result"]["ext_spots"]>

  export type ext_spotsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source_type?: boolean
    title?: boolean
    image_url?: boolean
    landmark_latitude?: boolean
    landmark_longitude?: boolean
    is_recommendable?: boolean
    created_at?: boolean
    lock_no?: boolean
  }, ExtArgs["result"]["ext_spots"]>

  export type ext_spotsSelectScalar = {
    id?: boolean
    source_type?: boolean
    title?: boolean
    image_url?: boolean
    landmark_latitude?: boolean
    landmark_longitude?: boolean
    is_recommendable?: boolean
    created_at?: boolean
    lock_no?: boolean
  }

  export type ext_spotsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "source_type" | "title" | "image_url" | "landmark_latitude" | "landmark_longitude" | "is_recommendable" | "created_at" | "lock_no", ExtArgs["result"]["ext_spots"]>
  export type ext_spotsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    spot_guides?: boolean | ext_spots$spot_guidesArgs<ExtArgs>
    spot_visits_spot_visits_prev_spot_idToext_spots?: boolean | ext_spots$spot_visits_spot_visits_prev_spot_idToext_spotsArgs<ExtArgs>
    spot_visits_spot_visits_spot_idToext_spots?: boolean | ext_spots$spot_visits_spot_visits_spot_idToext_spotsArgs<ExtArgs>
    _count?: boolean | Ext_spotsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ext_spotsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ext_spotsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ext_spotsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ext_spots"
    objects: {
      spot_guides: Prisma.$spot_guidesPayload<ExtArgs>[]
      spot_visits_spot_visits_prev_spot_idToext_spots: Prisma.$spot_visitsPayload<ExtArgs>[]
      spot_visits_spot_visits_spot_idToext_spots: Prisma.$spot_visitsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      source_type: $Enums.ext_spots_source_type
      title: string
      image_url: string
      landmark_latitude: number
      landmark_longitude: number
      is_recommendable: boolean
      created_at: Date
      lock_no: number
    }, ExtArgs["result"]["ext_spots"]>
    composites: {}
  }

  type ext_spotsGetPayload<S extends boolean | null | undefined | ext_spotsDefaultArgs> = $Result.GetResult<Prisma.$ext_spotsPayload, S>

  type ext_spotsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ext_spotsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Ext_spotsCountAggregateInputType | true
    }

  export interface ext_spotsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ext_spots'], meta: { name: 'ext_spots' } }
    /**
     * Find zero or one Ext_spots that matches the filter.
     * @param {ext_spotsFindUniqueArgs} args - Arguments to find a Ext_spots
     * @example
     * // Get one Ext_spots
     * const ext_spots = await prisma.ext_spots.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ext_spotsFindUniqueArgs>(args: SelectSubset<T, ext_spotsFindUniqueArgs<ExtArgs>>): Prisma__ext_spotsClient<$Result.GetResult<Prisma.$ext_spotsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ext_spots that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ext_spotsFindUniqueOrThrowArgs} args - Arguments to find a Ext_spots
     * @example
     * // Get one Ext_spots
     * const ext_spots = await prisma.ext_spots.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ext_spotsFindUniqueOrThrowArgs>(args: SelectSubset<T, ext_spotsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ext_spotsClient<$Result.GetResult<Prisma.$ext_spotsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ext_spots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ext_spotsFindFirstArgs} args - Arguments to find a Ext_spots
     * @example
     * // Get one Ext_spots
     * const ext_spots = await prisma.ext_spots.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ext_spotsFindFirstArgs>(args?: SelectSubset<T, ext_spotsFindFirstArgs<ExtArgs>>): Prisma__ext_spotsClient<$Result.GetResult<Prisma.$ext_spotsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ext_spots that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ext_spotsFindFirstOrThrowArgs} args - Arguments to find a Ext_spots
     * @example
     * // Get one Ext_spots
     * const ext_spots = await prisma.ext_spots.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ext_spotsFindFirstOrThrowArgs>(args?: SelectSubset<T, ext_spotsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ext_spotsClient<$Result.GetResult<Prisma.$ext_spotsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ext_spots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ext_spotsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ext_spots
     * const ext_spots = await prisma.ext_spots.findMany()
     * 
     * // Get first 10 Ext_spots
     * const ext_spots = await prisma.ext_spots.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ext_spotsWithIdOnly = await prisma.ext_spots.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ext_spotsFindManyArgs>(args?: SelectSubset<T, ext_spotsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ext_spotsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ext_spots.
     * @param {ext_spotsCreateArgs} args - Arguments to create a Ext_spots.
     * @example
     * // Create one Ext_spots
     * const Ext_spots = await prisma.ext_spots.create({
     *   data: {
     *     // ... data to create a Ext_spots
     *   }
     * })
     * 
     */
    create<T extends ext_spotsCreateArgs>(args: SelectSubset<T, ext_spotsCreateArgs<ExtArgs>>): Prisma__ext_spotsClient<$Result.GetResult<Prisma.$ext_spotsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ext_spots.
     * @param {ext_spotsCreateManyArgs} args - Arguments to create many Ext_spots.
     * @example
     * // Create many Ext_spots
     * const ext_spots = await prisma.ext_spots.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ext_spotsCreateManyArgs>(args?: SelectSubset<T, ext_spotsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ext_spots and returns the data saved in the database.
     * @param {ext_spotsCreateManyAndReturnArgs} args - Arguments to create many Ext_spots.
     * @example
     * // Create many Ext_spots
     * const ext_spots = await prisma.ext_spots.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ext_spots and only return the `id`
     * const ext_spotsWithIdOnly = await prisma.ext_spots.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ext_spotsCreateManyAndReturnArgs>(args?: SelectSubset<T, ext_spotsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ext_spotsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ext_spots.
     * @param {ext_spotsDeleteArgs} args - Arguments to delete one Ext_spots.
     * @example
     * // Delete one Ext_spots
     * const Ext_spots = await prisma.ext_spots.delete({
     *   where: {
     *     // ... filter to delete one Ext_spots
     *   }
     * })
     * 
     */
    delete<T extends ext_spotsDeleteArgs>(args: SelectSubset<T, ext_spotsDeleteArgs<ExtArgs>>): Prisma__ext_spotsClient<$Result.GetResult<Prisma.$ext_spotsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ext_spots.
     * @param {ext_spotsUpdateArgs} args - Arguments to update one Ext_spots.
     * @example
     * // Update one Ext_spots
     * const ext_spots = await prisma.ext_spots.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ext_spotsUpdateArgs>(args: SelectSubset<T, ext_spotsUpdateArgs<ExtArgs>>): Prisma__ext_spotsClient<$Result.GetResult<Prisma.$ext_spotsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ext_spots.
     * @param {ext_spotsDeleteManyArgs} args - Arguments to filter Ext_spots to delete.
     * @example
     * // Delete a few Ext_spots
     * const { count } = await prisma.ext_spots.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ext_spotsDeleteManyArgs>(args?: SelectSubset<T, ext_spotsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ext_spots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ext_spotsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ext_spots
     * const ext_spots = await prisma.ext_spots.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ext_spotsUpdateManyArgs>(args: SelectSubset<T, ext_spotsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ext_spots and returns the data updated in the database.
     * @param {ext_spotsUpdateManyAndReturnArgs} args - Arguments to update many Ext_spots.
     * @example
     * // Update many Ext_spots
     * const ext_spots = await prisma.ext_spots.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ext_spots and only return the `id`
     * const ext_spotsWithIdOnly = await prisma.ext_spots.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ext_spotsUpdateManyAndReturnArgs>(args: SelectSubset<T, ext_spotsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ext_spotsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ext_spots.
     * @param {ext_spotsUpsertArgs} args - Arguments to update or create a Ext_spots.
     * @example
     * // Update or create a Ext_spots
     * const ext_spots = await prisma.ext_spots.upsert({
     *   create: {
     *     // ... data to create a Ext_spots
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ext_spots we want to update
     *   }
     * })
     */
    upsert<T extends ext_spotsUpsertArgs>(args: SelectSubset<T, ext_spotsUpsertArgs<ExtArgs>>): Prisma__ext_spotsClient<$Result.GetResult<Prisma.$ext_spotsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ext_spots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ext_spotsCountArgs} args - Arguments to filter Ext_spots to count.
     * @example
     * // Count the number of Ext_spots
     * const count = await prisma.ext_spots.count({
     *   where: {
     *     // ... the filter for the Ext_spots we want to count
     *   }
     * })
    **/
    count<T extends ext_spotsCountArgs>(
      args?: Subset<T, ext_spotsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Ext_spotsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ext_spots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ext_spotsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Ext_spotsAggregateArgs>(args: Subset<T, Ext_spotsAggregateArgs>): Prisma.PrismaPromise<GetExt_spotsAggregateType<T>>

    /**
     * Group by Ext_spots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ext_spotsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ext_spotsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ext_spotsGroupByArgs['orderBy'] }
        : { orderBy?: ext_spotsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ext_spotsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExt_spotsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ext_spots model
   */
  readonly fields: ext_spotsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ext_spots.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ext_spotsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    spot_guides<T extends ext_spots$spot_guidesArgs<ExtArgs> = {}>(args?: Subset<T, ext_spots$spot_guidesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spot_guidesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    spot_visits_spot_visits_prev_spot_idToext_spots<T extends ext_spots$spot_visits_spot_visits_prev_spot_idToext_spotsArgs<ExtArgs> = {}>(args?: Subset<T, ext_spots$spot_visits_spot_visits_prev_spot_idToext_spotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spot_visitsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    spot_visits_spot_visits_spot_idToext_spots<T extends ext_spots$spot_visits_spot_visits_spot_idToext_spotsArgs<ExtArgs> = {}>(args?: Subset<T, ext_spots$spot_visits_spot_visits_spot_idToext_spotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spot_visitsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ext_spots model
   */
  interface ext_spotsFieldRefs {
    readonly id: FieldRef<"ext_spots", 'String'>
    readonly source_type: FieldRef<"ext_spots", 'ext_spots_source_type'>
    readonly title: FieldRef<"ext_spots", 'String'>
    readonly image_url: FieldRef<"ext_spots", 'String'>
    readonly landmark_latitude: FieldRef<"ext_spots", 'Float'>
    readonly landmark_longitude: FieldRef<"ext_spots", 'Float'>
    readonly is_recommendable: FieldRef<"ext_spots", 'Boolean'>
    readonly created_at: FieldRef<"ext_spots", 'DateTime'>
    readonly lock_no: FieldRef<"ext_spots", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ext_spots findUnique
   */
  export type ext_spotsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ext_spots
     */
    select?: ext_spotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ext_spots
     */
    omit?: ext_spotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ext_spotsInclude<ExtArgs> | null
    /**
     * Filter, which ext_spots to fetch.
     */
    where: ext_spotsWhereUniqueInput
  }

  /**
   * ext_spots findUniqueOrThrow
   */
  export type ext_spotsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ext_spots
     */
    select?: ext_spotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ext_spots
     */
    omit?: ext_spotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ext_spotsInclude<ExtArgs> | null
    /**
     * Filter, which ext_spots to fetch.
     */
    where: ext_spotsWhereUniqueInput
  }

  /**
   * ext_spots findFirst
   */
  export type ext_spotsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ext_spots
     */
    select?: ext_spotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ext_spots
     */
    omit?: ext_spotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ext_spotsInclude<ExtArgs> | null
    /**
     * Filter, which ext_spots to fetch.
     */
    where?: ext_spotsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ext_spots to fetch.
     */
    orderBy?: ext_spotsOrderByWithRelationInput | ext_spotsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ext_spots.
     */
    cursor?: ext_spotsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ext_spots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ext_spots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ext_spots.
     */
    distinct?: Ext_spotsScalarFieldEnum | Ext_spotsScalarFieldEnum[]
  }

  /**
   * ext_spots findFirstOrThrow
   */
  export type ext_spotsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ext_spots
     */
    select?: ext_spotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ext_spots
     */
    omit?: ext_spotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ext_spotsInclude<ExtArgs> | null
    /**
     * Filter, which ext_spots to fetch.
     */
    where?: ext_spotsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ext_spots to fetch.
     */
    orderBy?: ext_spotsOrderByWithRelationInput | ext_spotsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ext_spots.
     */
    cursor?: ext_spotsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ext_spots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ext_spots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ext_spots.
     */
    distinct?: Ext_spotsScalarFieldEnum | Ext_spotsScalarFieldEnum[]
  }

  /**
   * ext_spots findMany
   */
  export type ext_spotsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ext_spots
     */
    select?: ext_spotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ext_spots
     */
    omit?: ext_spotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ext_spotsInclude<ExtArgs> | null
    /**
     * Filter, which ext_spots to fetch.
     */
    where?: ext_spotsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ext_spots to fetch.
     */
    orderBy?: ext_spotsOrderByWithRelationInput | ext_spotsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ext_spots.
     */
    cursor?: ext_spotsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ext_spots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ext_spots.
     */
    skip?: number
    distinct?: Ext_spotsScalarFieldEnum | Ext_spotsScalarFieldEnum[]
  }

  /**
   * ext_spots create
   */
  export type ext_spotsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ext_spots
     */
    select?: ext_spotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ext_spots
     */
    omit?: ext_spotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ext_spotsInclude<ExtArgs> | null
    /**
     * The data needed to create a ext_spots.
     */
    data: XOR<ext_spotsCreateInput, ext_spotsUncheckedCreateInput>
  }

  /**
   * ext_spots createMany
   */
  export type ext_spotsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ext_spots.
     */
    data: ext_spotsCreateManyInput | ext_spotsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ext_spots createManyAndReturn
   */
  export type ext_spotsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ext_spots
     */
    select?: ext_spotsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ext_spots
     */
    omit?: ext_spotsOmit<ExtArgs> | null
    /**
     * The data used to create many ext_spots.
     */
    data: ext_spotsCreateManyInput | ext_spotsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ext_spots update
   */
  export type ext_spotsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ext_spots
     */
    select?: ext_spotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ext_spots
     */
    omit?: ext_spotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ext_spotsInclude<ExtArgs> | null
    /**
     * The data needed to update a ext_spots.
     */
    data: XOR<ext_spotsUpdateInput, ext_spotsUncheckedUpdateInput>
    /**
     * Choose, which ext_spots to update.
     */
    where: ext_spotsWhereUniqueInput
  }

  /**
   * ext_spots updateMany
   */
  export type ext_spotsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ext_spots.
     */
    data: XOR<ext_spotsUpdateManyMutationInput, ext_spotsUncheckedUpdateManyInput>
    /**
     * Filter which ext_spots to update
     */
    where?: ext_spotsWhereInput
    /**
     * Limit how many ext_spots to update.
     */
    limit?: number
  }

  /**
   * ext_spots updateManyAndReturn
   */
  export type ext_spotsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ext_spots
     */
    select?: ext_spotsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ext_spots
     */
    omit?: ext_spotsOmit<ExtArgs> | null
    /**
     * The data used to update ext_spots.
     */
    data: XOR<ext_spotsUpdateManyMutationInput, ext_spotsUncheckedUpdateManyInput>
    /**
     * Filter which ext_spots to update
     */
    where?: ext_spotsWhereInput
    /**
     * Limit how many ext_spots to update.
     */
    limit?: number
  }

  /**
   * ext_spots upsert
   */
  export type ext_spotsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ext_spots
     */
    select?: ext_spotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ext_spots
     */
    omit?: ext_spotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ext_spotsInclude<ExtArgs> | null
    /**
     * The filter to search for the ext_spots to update in case it exists.
     */
    where: ext_spotsWhereUniqueInput
    /**
     * In case the ext_spots found by the `where` argument doesn't exist, create a new ext_spots with this data.
     */
    create: XOR<ext_spotsCreateInput, ext_spotsUncheckedCreateInput>
    /**
     * In case the ext_spots was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ext_spotsUpdateInput, ext_spotsUncheckedUpdateInput>
  }

  /**
   * ext_spots delete
   */
  export type ext_spotsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ext_spots
     */
    select?: ext_spotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ext_spots
     */
    omit?: ext_spotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ext_spotsInclude<ExtArgs> | null
    /**
     * Filter which ext_spots to delete.
     */
    where: ext_spotsWhereUniqueInput
  }

  /**
   * ext_spots deleteMany
   */
  export type ext_spotsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ext_spots to delete
     */
    where?: ext_spotsWhereInput
    /**
     * Limit how many ext_spots to delete.
     */
    limit?: number
  }

  /**
   * ext_spots.spot_guides
   */
  export type ext_spots$spot_guidesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_guides
     */
    select?: spot_guidesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_guides
     */
    omit?: spot_guidesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_guidesInclude<ExtArgs> | null
    where?: spot_guidesWhereInput
    orderBy?: spot_guidesOrderByWithRelationInput | spot_guidesOrderByWithRelationInput[]
    cursor?: spot_guidesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Spot_guidesScalarFieldEnum | Spot_guidesScalarFieldEnum[]
  }

  /**
   * ext_spots.spot_visits_spot_visits_prev_spot_idToext_spots
   */
  export type ext_spots$spot_visits_spot_visits_prev_spot_idToext_spotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_visits
     */
    select?: spot_visitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_visits
     */
    omit?: spot_visitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_visitsInclude<ExtArgs> | null
    where?: spot_visitsWhereInput
    orderBy?: spot_visitsOrderByWithRelationInput | spot_visitsOrderByWithRelationInput[]
    cursor?: spot_visitsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Spot_visitsScalarFieldEnum | Spot_visitsScalarFieldEnum[]
  }

  /**
   * ext_spots.spot_visits_spot_visits_spot_idToext_spots
   */
  export type ext_spots$spot_visits_spot_visits_spot_idToext_spotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_visits
     */
    select?: spot_visitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_visits
     */
    omit?: spot_visitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_visitsInclude<ExtArgs> | null
    where?: spot_visitsWhereInput
    orderBy?: spot_visitsOrderByWithRelationInput | spot_visitsOrderByWithRelationInput[]
    cursor?: spot_visitsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Spot_visitsScalarFieldEnum | Spot_visitsScalarFieldEnum[]
  }

  /**
   * ext_spots without action
   */
  export type ext_spotsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ext_spots
     */
    select?: ext_spotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ext_spots
     */
    omit?: ext_spotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ext_spotsInclude<ExtArgs> | null
  }


  /**
   * Model external_api_logs
   */

  export type AggregateExternal_api_logs = {
    _count: External_api_logsCountAggregateOutputType | null
    _avg: External_api_logsAvgAggregateOutputType | null
    _sum: External_api_logsSumAggregateOutputType | null
    _min: External_api_logsMinAggregateOutputType | null
    _max: External_api_logsMaxAggregateOutputType | null
  }

  export type External_api_logsAvgAggregateOutputType = {
    status_code: number | null
    response_time_ms: number | null
  }

  export type External_api_logsSumAggregateOutputType = {
    status_code: number | null
    response_time_ms: number | null
  }

  export type External_api_logsMinAggregateOutputType = {
    id: string | null
    request_id: string | null
    function_name: string | null
    api_name: string | null
    endpoint: string | null
    status_code: number | null
    error_message: string | null
    response_time_ms: number | null
    user_id: string | null
    created_at: Date | null
    created_commit_id: string | null
  }

  export type External_api_logsMaxAggregateOutputType = {
    id: string | null
    request_id: string | null
    function_name: string | null
    api_name: string | null
    endpoint: string | null
    status_code: number | null
    error_message: string | null
    response_time_ms: number | null
    user_id: string | null
    created_at: Date | null
    created_commit_id: string | null
  }

  export type External_api_logsCountAggregateOutputType = {
    id: number
    request_id: number
    function_name: number
    api_name: number
    endpoint: number
    request_payload: number
    response_payload: number
    status_code: number
    error_message: number
    response_time_ms: number
    user_id: number
    created_at: number
    created_commit_id: number
    _all: number
  }


  export type External_api_logsAvgAggregateInputType = {
    status_code?: true
    response_time_ms?: true
  }

  export type External_api_logsSumAggregateInputType = {
    status_code?: true
    response_time_ms?: true
  }

  export type External_api_logsMinAggregateInputType = {
    id?: true
    request_id?: true
    function_name?: true
    api_name?: true
    endpoint?: true
    status_code?: true
    error_message?: true
    response_time_ms?: true
    user_id?: true
    created_at?: true
    created_commit_id?: true
  }

  export type External_api_logsMaxAggregateInputType = {
    id?: true
    request_id?: true
    function_name?: true
    api_name?: true
    endpoint?: true
    status_code?: true
    error_message?: true
    response_time_ms?: true
    user_id?: true
    created_at?: true
    created_commit_id?: true
  }

  export type External_api_logsCountAggregateInputType = {
    id?: true
    request_id?: true
    function_name?: true
    api_name?: true
    endpoint?: true
    request_payload?: true
    response_payload?: true
    status_code?: true
    error_message?: true
    response_time_ms?: true
    user_id?: true
    created_at?: true
    created_commit_id?: true
    _all?: true
  }

  export type External_api_logsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which external_api_logs to aggregate.
     */
    where?: external_api_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of external_api_logs to fetch.
     */
    orderBy?: external_api_logsOrderByWithRelationInput | external_api_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: external_api_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` external_api_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` external_api_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned external_api_logs
    **/
    _count?: true | External_api_logsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: External_api_logsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: External_api_logsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: External_api_logsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: External_api_logsMaxAggregateInputType
  }

  export type GetExternal_api_logsAggregateType<T extends External_api_logsAggregateArgs> = {
        [P in keyof T & keyof AggregateExternal_api_logs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExternal_api_logs[P]>
      : GetScalarType<T[P], AggregateExternal_api_logs[P]>
  }




  export type external_api_logsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: external_api_logsWhereInput
    orderBy?: external_api_logsOrderByWithAggregationInput | external_api_logsOrderByWithAggregationInput[]
    by: External_api_logsScalarFieldEnum[] | External_api_logsScalarFieldEnum
    having?: external_api_logsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: External_api_logsCountAggregateInputType | true
    _avg?: External_api_logsAvgAggregateInputType
    _sum?: External_api_logsSumAggregateInputType
    _min?: External_api_logsMinAggregateInputType
    _max?: External_api_logsMaxAggregateInputType
  }

  export type External_api_logsGroupByOutputType = {
    id: string
    request_id: string | null
    function_name: string | null
    api_name: string | null
    endpoint: string | null
    request_payload: JsonValue | null
    response_payload: JsonValue | null
    status_code: number | null
    error_message: string | null
    response_time_ms: number | null
    user_id: string | null
    created_at: Date
    created_commit_id: string
    _count: External_api_logsCountAggregateOutputType | null
    _avg: External_api_logsAvgAggregateOutputType | null
    _sum: External_api_logsSumAggregateOutputType | null
    _min: External_api_logsMinAggregateOutputType | null
    _max: External_api_logsMaxAggregateOutputType | null
  }

  type GetExternal_api_logsGroupByPayload<T extends external_api_logsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<External_api_logsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof External_api_logsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], External_api_logsGroupByOutputType[P]>
            : GetScalarType<T[P], External_api_logsGroupByOutputType[P]>
        }
      >
    >


  export type external_api_logsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    request_id?: boolean
    function_name?: boolean
    api_name?: boolean
    endpoint?: boolean
    request_payload?: boolean
    response_payload?: boolean
    status_code?: boolean
    error_message?: boolean
    response_time_ms?: boolean
    user_id?: boolean
    created_at?: boolean
    created_commit_id?: boolean
  }, ExtArgs["result"]["external_api_logs"]>

  export type external_api_logsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    request_id?: boolean
    function_name?: boolean
    api_name?: boolean
    endpoint?: boolean
    request_payload?: boolean
    response_payload?: boolean
    status_code?: boolean
    error_message?: boolean
    response_time_ms?: boolean
    user_id?: boolean
    created_at?: boolean
    created_commit_id?: boolean
  }, ExtArgs["result"]["external_api_logs"]>

  export type external_api_logsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    request_id?: boolean
    function_name?: boolean
    api_name?: boolean
    endpoint?: boolean
    request_payload?: boolean
    response_payload?: boolean
    status_code?: boolean
    error_message?: boolean
    response_time_ms?: boolean
    user_id?: boolean
    created_at?: boolean
    created_commit_id?: boolean
  }, ExtArgs["result"]["external_api_logs"]>

  export type external_api_logsSelectScalar = {
    id?: boolean
    request_id?: boolean
    function_name?: boolean
    api_name?: boolean
    endpoint?: boolean
    request_payload?: boolean
    response_payload?: boolean
    status_code?: boolean
    error_message?: boolean
    response_time_ms?: boolean
    user_id?: boolean
    created_at?: boolean
    created_commit_id?: boolean
  }

  export type external_api_logsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "request_id" | "function_name" | "api_name" | "endpoint" | "request_payload" | "response_payload" | "status_code" | "error_message" | "response_time_ms" | "user_id" | "created_at" | "created_commit_id", ExtArgs["result"]["external_api_logs"]>

  export type $external_api_logsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "external_api_logs"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      request_id: string | null
      function_name: string | null
      api_name: string | null
      endpoint: string | null
      request_payload: Prisma.JsonValue | null
      response_payload: Prisma.JsonValue | null
      status_code: number | null
      error_message: string | null
      response_time_ms: number | null
      user_id: string | null
      created_at: Date
      created_commit_id: string
    }, ExtArgs["result"]["external_api_logs"]>
    composites: {}
  }

  type external_api_logsGetPayload<S extends boolean | null | undefined | external_api_logsDefaultArgs> = $Result.GetResult<Prisma.$external_api_logsPayload, S>

  type external_api_logsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<external_api_logsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: External_api_logsCountAggregateInputType | true
    }

  export interface external_api_logsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['external_api_logs'], meta: { name: 'external_api_logs' } }
    /**
     * Find zero or one External_api_logs that matches the filter.
     * @param {external_api_logsFindUniqueArgs} args - Arguments to find a External_api_logs
     * @example
     * // Get one External_api_logs
     * const external_api_logs = await prisma.external_api_logs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends external_api_logsFindUniqueArgs>(args: SelectSubset<T, external_api_logsFindUniqueArgs<ExtArgs>>): Prisma__external_api_logsClient<$Result.GetResult<Prisma.$external_api_logsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one External_api_logs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {external_api_logsFindUniqueOrThrowArgs} args - Arguments to find a External_api_logs
     * @example
     * // Get one External_api_logs
     * const external_api_logs = await prisma.external_api_logs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends external_api_logsFindUniqueOrThrowArgs>(args: SelectSubset<T, external_api_logsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__external_api_logsClient<$Result.GetResult<Prisma.$external_api_logsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first External_api_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {external_api_logsFindFirstArgs} args - Arguments to find a External_api_logs
     * @example
     * // Get one External_api_logs
     * const external_api_logs = await prisma.external_api_logs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends external_api_logsFindFirstArgs>(args?: SelectSubset<T, external_api_logsFindFirstArgs<ExtArgs>>): Prisma__external_api_logsClient<$Result.GetResult<Prisma.$external_api_logsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first External_api_logs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {external_api_logsFindFirstOrThrowArgs} args - Arguments to find a External_api_logs
     * @example
     * // Get one External_api_logs
     * const external_api_logs = await prisma.external_api_logs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends external_api_logsFindFirstOrThrowArgs>(args?: SelectSubset<T, external_api_logsFindFirstOrThrowArgs<ExtArgs>>): Prisma__external_api_logsClient<$Result.GetResult<Prisma.$external_api_logsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more External_api_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {external_api_logsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all External_api_logs
     * const external_api_logs = await prisma.external_api_logs.findMany()
     * 
     * // Get first 10 External_api_logs
     * const external_api_logs = await prisma.external_api_logs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const external_api_logsWithIdOnly = await prisma.external_api_logs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends external_api_logsFindManyArgs>(args?: SelectSubset<T, external_api_logsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$external_api_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a External_api_logs.
     * @param {external_api_logsCreateArgs} args - Arguments to create a External_api_logs.
     * @example
     * // Create one External_api_logs
     * const External_api_logs = await prisma.external_api_logs.create({
     *   data: {
     *     // ... data to create a External_api_logs
     *   }
     * })
     * 
     */
    create<T extends external_api_logsCreateArgs>(args: SelectSubset<T, external_api_logsCreateArgs<ExtArgs>>): Prisma__external_api_logsClient<$Result.GetResult<Prisma.$external_api_logsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many External_api_logs.
     * @param {external_api_logsCreateManyArgs} args - Arguments to create many External_api_logs.
     * @example
     * // Create many External_api_logs
     * const external_api_logs = await prisma.external_api_logs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends external_api_logsCreateManyArgs>(args?: SelectSubset<T, external_api_logsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many External_api_logs and returns the data saved in the database.
     * @param {external_api_logsCreateManyAndReturnArgs} args - Arguments to create many External_api_logs.
     * @example
     * // Create many External_api_logs
     * const external_api_logs = await prisma.external_api_logs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many External_api_logs and only return the `id`
     * const external_api_logsWithIdOnly = await prisma.external_api_logs.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends external_api_logsCreateManyAndReturnArgs>(args?: SelectSubset<T, external_api_logsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$external_api_logsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a External_api_logs.
     * @param {external_api_logsDeleteArgs} args - Arguments to delete one External_api_logs.
     * @example
     * // Delete one External_api_logs
     * const External_api_logs = await prisma.external_api_logs.delete({
     *   where: {
     *     // ... filter to delete one External_api_logs
     *   }
     * })
     * 
     */
    delete<T extends external_api_logsDeleteArgs>(args: SelectSubset<T, external_api_logsDeleteArgs<ExtArgs>>): Prisma__external_api_logsClient<$Result.GetResult<Prisma.$external_api_logsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one External_api_logs.
     * @param {external_api_logsUpdateArgs} args - Arguments to update one External_api_logs.
     * @example
     * // Update one External_api_logs
     * const external_api_logs = await prisma.external_api_logs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends external_api_logsUpdateArgs>(args: SelectSubset<T, external_api_logsUpdateArgs<ExtArgs>>): Prisma__external_api_logsClient<$Result.GetResult<Prisma.$external_api_logsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more External_api_logs.
     * @param {external_api_logsDeleteManyArgs} args - Arguments to filter External_api_logs to delete.
     * @example
     * // Delete a few External_api_logs
     * const { count } = await prisma.external_api_logs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends external_api_logsDeleteManyArgs>(args?: SelectSubset<T, external_api_logsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more External_api_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {external_api_logsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many External_api_logs
     * const external_api_logs = await prisma.external_api_logs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends external_api_logsUpdateManyArgs>(args: SelectSubset<T, external_api_logsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more External_api_logs and returns the data updated in the database.
     * @param {external_api_logsUpdateManyAndReturnArgs} args - Arguments to update many External_api_logs.
     * @example
     * // Update many External_api_logs
     * const external_api_logs = await prisma.external_api_logs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more External_api_logs and only return the `id`
     * const external_api_logsWithIdOnly = await prisma.external_api_logs.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends external_api_logsUpdateManyAndReturnArgs>(args: SelectSubset<T, external_api_logsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$external_api_logsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one External_api_logs.
     * @param {external_api_logsUpsertArgs} args - Arguments to update or create a External_api_logs.
     * @example
     * // Update or create a External_api_logs
     * const external_api_logs = await prisma.external_api_logs.upsert({
     *   create: {
     *     // ... data to create a External_api_logs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the External_api_logs we want to update
     *   }
     * })
     */
    upsert<T extends external_api_logsUpsertArgs>(args: SelectSubset<T, external_api_logsUpsertArgs<ExtArgs>>): Prisma__external_api_logsClient<$Result.GetResult<Prisma.$external_api_logsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of External_api_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {external_api_logsCountArgs} args - Arguments to filter External_api_logs to count.
     * @example
     * // Count the number of External_api_logs
     * const count = await prisma.external_api_logs.count({
     *   where: {
     *     // ... the filter for the External_api_logs we want to count
     *   }
     * })
    **/
    count<T extends external_api_logsCountArgs>(
      args?: Subset<T, external_api_logsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], External_api_logsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a External_api_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {External_api_logsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends External_api_logsAggregateArgs>(args: Subset<T, External_api_logsAggregateArgs>): Prisma.PrismaPromise<GetExternal_api_logsAggregateType<T>>

    /**
     * Group by External_api_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {external_api_logsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends external_api_logsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: external_api_logsGroupByArgs['orderBy'] }
        : { orderBy?: external_api_logsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, external_api_logsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExternal_api_logsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the external_api_logs model
   */
  readonly fields: external_api_logsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for external_api_logs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__external_api_logsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the external_api_logs model
   */
  interface external_api_logsFieldRefs {
    readonly id: FieldRef<"external_api_logs", 'String'>
    readonly request_id: FieldRef<"external_api_logs", 'String'>
    readonly function_name: FieldRef<"external_api_logs", 'String'>
    readonly api_name: FieldRef<"external_api_logs", 'String'>
    readonly endpoint: FieldRef<"external_api_logs", 'String'>
    readonly request_payload: FieldRef<"external_api_logs", 'Json'>
    readonly response_payload: FieldRef<"external_api_logs", 'Json'>
    readonly status_code: FieldRef<"external_api_logs", 'Int'>
    readonly error_message: FieldRef<"external_api_logs", 'String'>
    readonly response_time_ms: FieldRef<"external_api_logs", 'Int'>
    readonly user_id: FieldRef<"external_api_logs", 'String'>
    readonly created_at: FieldRef<"external_api_logs", 'DateTime'>
    readonly created_commit_id: FieldRef<"external_api_logs", 'String'>
  }
    

  // Custom InputTypes
  /**
   * external_api_logs findUnique
   */
  export type external_api_logsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
    /**
     * Filter, which external_api_logs to fetch.
     */
    where: external_api_logsWhereUniqueInput
  }

  /**
   * external_api_logs findUniqueOrThrow
   */
  export type external_api_logsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
    /**
     * Filter, which external_api_logs to fetch.
     */
    where: external_api_logsWhereUniqueInput
  }

  /**
   * external_api_logs findFirst
   */
  export type external_api_logsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
    /**
     * Filter, which external_api_logs to fetch.
     */
    where?: external_api_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of external_api_logs to fetch.
     */
    orderBy?: external_api_logsOrderByWithRelationInput | external_api_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for external_api_logs.
     */
    cursor?: external_api_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` external_api_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` external_api_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of external_api_logs.
     */
    distinct?: External_api_logsScalarFieldEnum | External_api_logsScalarFieldEnum[]
  }

  /**
   * external_api_logs findFirstOrThrow
   */
  export type external_api_logsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
    /**
     * Filter, which external_api_logs to fetch.
     */
    where?: external_api_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of external_api_logs to fetch.
     */
    orderBy?: external_api_logsOrderByWithRelationInput | external_api_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for external_api_logs.
     */
    cursor?: external_api_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` external_api_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` external_api_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of external_api_logs.
     */
    distinct?: External_api_logsScalarFieldEnum | External_api_logsScalarFieldEnum[]
  }

  /**
   * external_api_logs findMany
   */
  export type external_api_logsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
    /**
     * Filter, which external_api_logs to fetch.
     */
    where?: external_api_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of external_api_logs to fetch.
     */
    orderBy?: external_api_logsOrderByWithRelationInput | external_api_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing external_api_logs.
     */
    cursor?: external_api_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` external_api_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` external_api_logs.
     */
    skip?: number
    distinct?: External_api_logsScalarFieldEnum | External_api_logsScalarFieldEnum[]
  }

  /**
   * external_api_logs create
   */
  export type external_api_logsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
    /**
     * The data needed to create a external_api_logs.
     */
    data: XOR<external_api_logsCreateInput, external_api_logsUncheckedCreateInput>
  }

  /**
   * external_api_logs createMany
   */
  export type external_api_logsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many external_api_logs.
     */
    data: external_api_logsCreateManyInput | external_api_logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * external_api_logs createManyAndReturn
   */
  export type external_api_logsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
    /**
     * The data used to create many external_api_logs.
     */
    data: external_api_logsCreateManyInput | external_api_logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * external_api_logs update
   */
  export type external_api_logsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
    /**
     * The data needed to update a external_api_logs.
     */
    data: XOR<external_api_logsUpdateInput, external_api_logsUncheckedUpdateInput>
    /**
     * Choose, which external_api_logs to update.
     */
    where: external_api_logsWhereUniqueInput
  }

  /**
   * external_api_logs updateMany
   */
  export type external_api_logsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update external_api_logs.
     */
    data: XOR<external_api_logsUpdateManyMutationInput, external_api_logsUncheckedUpdateManyInput>
    /**
     * Filter which external_api_logs to update
     */
    where?: external_api_logsWhereInput
    /**
     * Limit how many external_api_logs to update.
     */
    limit?: number
  }

  /**
   * external_api_logs updateManyAndReturn
   */
  export type external_api_logsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
    /**
     * The data used to update external_api_logs.
     */
    data: XOR<external_api_logsUpdateManyMutationInput, external_api_logsUncheckedUpdateManyInput>
    /**
     * Filter which external_api_logs to update
     */
    where?: external_api_logsWhereInput
    /**
     * Limit how many external_api_logs to update.
     */
    limit?: number
  }

  /**
   * external_api_logs upsert
   */
  export type external_api_logsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
    /**
     * The filter to search for the external_api_logs to update in case it exists.
     */
    where: external_api_logsWhereUniqueInput
    /**
     * In case the external_api_logs found by the `where` argument doesn't exist, create a new external_api_logs with this data.
     */
    create: XOR<external_api_logsCreateInput, external_api_logsUncheckedCreateInput>
    /**
     * In case the external_api_logs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<external_api_logsUpdateInput, external_api_logsUncheckedUpdateInput>
  }

  /**
   * external_api_logs delete
   */
  export type external_api_logsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
    /**
     * Filter which external_api_logs to delete.
     */
    where: external_api_logsWhereUniqueInput
  }

  /**
   * external_api_logs deleteMany
   */
  export type external_api_logsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which external_api_logs to delete
     */
    where?: external_api_logsWhereInput
    /**
     * Limit how many external_api_logs to delete.
     */
    limit?: number
  }

  /**
   * external_api_logs without action
   */
  export type external_api_logsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
  }


  /**
   * Model frontend_event_logs
   */

  export type AggregateFrontend_event_logs = {
    _count: Frontend_event_logsCountAggregateOutputType | null
    _min: Frontend_event_logsMinAggregateOutputType | null
    _max: Frontend_event_logsMaxAggregateOutputType | null
  }

  export type Frontend_event_logsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    event_name: string | null
    error_level: $Enums.frontend_event_logs_error_level | null
    screen_name: string | null
    payload: string | null
    created_at: Date | null
    created_app_version: string | null
    created_commit_id: string | null
  }

  export type Frontend_event_logsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    event_name: string | null
    error_level: $Enums.frontend_event_logs_error_level | null
    screen_name: string | null
    payload: string | null
    created_at: Date | null
    created_app_version: string | null
    created_commit_id: string | null
  }

  export type Frontend_event_logsCountAggregateOutputType = {
    id: number
    user_id: number
    event_name: number
    error_level: number
    screen_name: number
    payload: number
    created_at: number
    created_app_version: number
    created_commit_id: number
    _all: number
  }


  export type Frontend_event_logsMinAggregateInputType = {
    id?: true
    user_id?: true
    event_name?: true
    error_level?: true
    screen_name?: true
    payload?: true
    created_at?: true
    created_app_version?: true
    created_commit_id?: true
  }

  export type Frontend_event_logsMaxAggregateInputType = {
    id?: true
    user_id?: true
    event_name?: true
    error_level?: true
    screen_name?: true
    payload?: true
    created_at?: true
    created_app_version?: true
    created_commit_id?: true
  }

  export type Frontend_event_logsCountAggregateInputType = {
    id?: true
    user_id?: true
    event_name?: true
    error_level?: true
    screen_name?: true
    payload?: true
    created_at?: true
    created_app_version?: true
    created_commit_id?: true
    _all?: true
  }

  export type Frontend_event_logsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which frontend_event_logs to aggregate.
     */
    where?: frontend_event_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of frontend_event_logs to fetch.
     */
    orderBy?: frontend_event_logsOrderByWithRelationInput | frontend_event_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: frontend_event_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` frontend_event_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` frontend_event_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned frontend_event_logs
    **/
    _count?: true | Frontend_event_logsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Frontend_event_logsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Frontend_event_logsMaxAggregateInputType
  }

  export type GetFrontend_event_logsAggregateType<T extends Frontend_event_logsAggregateArgs> = {
        [P in keyof T & keyof AggregateFrontend_event_logs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFrontend_event_logs[P]>
      : GetScalarType<T[P], AggregateFrontend_event_logs[P]>
  }




  export type frontend_event_logsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: frontend_event_logsWhereInput
    orderBy?: frontend_event_logsOrderByWithAggregationInput | frontend_event_logsOrderByWithAggregationInput[]
    by: Frontend_event_logsScalarFieldEnum[] | Frontend_event_logsScalarFieldEnum
    having?: frontend_event_logsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Frontend_event_logsCountAggregateInputType | true
    _min?: Frontend_event_logsMinAggregateInputType
    _max?: Frontend_event_logsMaxAggregateInputType
  }

  export type Frontend_event_logsGroupByOutputType = {
    id: string
    user_id: string | null
    event_name: string | null
    error_level: $Enums.frontend_event_logs_error_level | null
    screen_name: string | null
    payload: string | null
    created_at: Date
    created_app_version: string
    created_commit_id: string
    _count: Frontend_event_logsCountAggregateOutputType | null
    _min: Frontend_event_logsMinAggregateOutputType | null
    _max: Frontend_event_logsMaxAggregateOutputType | null
  }

  type GetFrontend_event_logsGroupByPayload<T extends frontend_event_logsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Frontend_event_logsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Frontend_event_logsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Frontend_event_logsGroupByOutputType[P]>
            : GetScalarType<T[P], Frontend_event_logsGroupByOutputType[P]>
        }
      >
    >


  export type frontend_event_logsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    event_name?: boolean
    error_level?: boolean
    screen_name?: boolean
    payload?: boolean
    created_at?: boolean
    created_app_version?: boolean
    created_commit_id?: boolean
  }, ExtArgs["result"]["frontend_event_logs"]>

  export type frontend_event_logsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    event_name?: boolean
    error_level?: boolean
    screen_name?: boolean
    payload?: boolean
    created_at?: boolean
    created_app_version?: boolean
    created_commit_id?: boolean
  }, ExtArgs["result"]["frontend_event_logs"]>

  export type frontend_event_logsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    event_name?: boolean
    error_level?: boolean
    screen_name?: boolean
    payload?: boolean
    created_at?: boolean
    created_app_version?: boolean
    created_commit_id?: boolean
  }, ExtArgs["result"]["frontend_event_logs"]>

  export type frontend_event_logsSelectScalar = {
    id?: boolean
    user_id?: boolean
    event_name?: boolean
    error_level?: boolean
    screen_name?: boolean
    payload?: boolean
    created_at?: boolean
    created_app_version?: boolean
    created_commit_id?: boolean
  }

  export type frontend_event_logsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "event_name" | "error_level" | "screen_name" | "payload" | "created_at" | "created_app_version" | "created_commit_id", ExtArgs["result"]["frontend_event_logs"]>

  export type $frontend_event_logsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "frontend_event_logs"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string | null
      event_name: string | null
      error_level: $Enums.frontend_event_logs_error_level | null
      screen_name: string | null
      payload: string | null
      created_at: Date
      created_app_version: string
      created_commit_id: string
    }, ExtArgs["result"]["frontend_event_logs"]>
    composites: {}
  }

  type frontend_event_logsGetPayload<S extends boolean | null | undefined | frontend_event_logsDefaultArgs> = $Result.GetResult<Prisma.$frontend_event_logsPayload, S>

  type frontend_event_logsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<frontend_event_logsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Frontend_event_logsCountAggregateInputType | true
    }

  export interface frontend_event_logsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['frontend_event_logs'], meta: { name: 'frontend_event_logs' } }
    /**
     * Find zero or one Frontend_event_logs that matches the filter.
     * @param {frontend_event_logsFindUniqueArgs} args - Arguments to find a Frontend_event_logs
     * @example
     * // Get one Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends frontend_event_logsFindUniqueArgs>(args: SelectSubset<T, frontend_event_logsFindUniqueArgs<ExtArgs>>): Prisma__frontend_event_logsClient<$Result.GetResult<Prisma.$frontend_event_logsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Frontend_event_logs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {frontend_event_logsFindUniqueOrThrowArgs} args - Arguments to find a Frontend_event_logs
     * @example
     * // Get one Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends frontend_event_logsFindUniqueOrThrowArgs>(args: SelectSubset<T, frontend_event_logsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__frontend_event_logsClient<$Result.GetResult<Prisma.$frontend_event_logsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Frontend_event_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {frontend_event_logsFindFirstArgs} args - Arguments to find a Frontend_event_logs
     * @example
     * // Get one Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends frontend_event_logsFindFirstArgs>(args?: SelectSubset<T, frontend_event_logsFindFirstArgs<ExtArgs>>): Prisma__frontend_event_logsClient<$Result.GetResult<Prisma.$frontend_event_logsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Frontend_event_logs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {frontend_event_logsFindFirstOrThrowArgs} args - Arguments to find a Frontend_event_logs
     * @example
     * // Get one Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends frontend_event_logsFindFirstOrThrowArgs>(args?: SelectSubset<T, frontend_event_logsFindFirstOrThrowArgs<ExtArgs>>): Prisma__frontend_event_logsClient<$Result.GetResult<Prisma.$frontend_event_logsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Frontend_event_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {frontend_event_logsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.findMany()
     * 
     * // Get first 10 Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const frontend_event_logsWithIdOnly = await prisma.frontend_event_logs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends frontend_event_logsFindManyArgs>(args?: SelectSubset<T, frontend_event_logsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$frontend_event_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Frontend_event_logs.
     * @param {frontend_event_logsCreateArgs} args - Arguments to create a Frontend_event_logs.
     * @example
     * // Create one Frontend_event_logs
     * const Frontend_event_logs = await prisma.frontend_event_logs.create({
     *   data: {
     *     // ... data to create a Frontend_event_logs
     *   }
     * })
     * 
     */
    create<T extends frontend_event_logsCreateArgs>(args: SelectSubset<T, frontend_event_logsCreateArgs<ExtArgs>>): Prisma__frontend_event_logsClient<$Result.GetResult<Prisma.$frontend_event_logsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Frontend_event_logs.
     * @param {frontend_event_logsCreateManyArgs} args - Arguments to create many Frontend_event_logs.
     * @example
     * // Create many Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends frontend_event_logsCreateManyArgs>(args?: SelectSubset<T, frontend_event_logsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Frontend_event_logs and returns the data saved in the database.
     * @param {frontend_event_logsCreateManyAndReturnArgs} args - Arguments to create many Frontend_event_logs.
     * @example
     * // Create many Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Frontend_event_logs and only return the `id`
     * const frontend_event_logsWithIdOnly = await prisma.frontend_event_logs.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends frontend_event_logsCreateManyAndReturnArgs>(args?: SelectSubset<T, frontend_event_logsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$frontend_event_logsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Frontend_event_logs.
     * @param {frontend_event_logsDeleteArgs} args - Arguments to delete one Frontend_event_logs.
     * @example
     * // Delete one Frontend_event_logs
     * const Frontend_event_logs = await prisma.frontend_event_logs.delete({
     *   where: {
     *     // ... filter to delete one Frontend_event_logs
     *   }
     * })
     * 
     */
    delete<T extends frontend_event_logsDeleteArgs>(args: SelectSubset<T, frontend_event_logsDeleteArgs<ExtArgs>>): Prisma__frontend_event_logsClient<$Result.GetResult<Prisma.$frontend_event_logsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Frontend_event_logs.
     * @param {frontend_event_logsUpdateArgs} args - Arguments to update one Frontend_event_logs.
     * @example
     * // Update one Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends frontend_event_logsUpdateArgs>(args: SelectSubset<T, frontend_event_logsUpdateArgs<ExtArgs>>): Prisma__frontend_event_logsClient<$Result.GetResult<Prisma.$frontend_event_logsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Frontend_event_logs.
     * @param {frontend_event_logsDeleteManyArgs} args - Arguments to filter Frontend_event_logs to delete.
     * @example
     * // Delete a few Frontend_event_logs
     * const { count } = await prisma.frontend_event_logs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends frontend_event_logsDeleteManyArgs>(args?: SelectSubset<T, frontend_event_logsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Frontend_event_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {frontend_event_logsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends frontend_event_logsUpdateManyArgs>(args: SelectSubset<T, frontend_event_logsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Frontend_event_logs and returns the data updated in the database.
     * @param {frontend_event_logsUpdateManyAndReturnArgs} args - Arguments to update many Frontend_event_logs.
     * @example
     * // Update many Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Frontend_event_logs and only return the `id`
     * const frontend_event_logsWithIdOnly = await prisma.frontend_event_logs.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends frontend_event_logsUpdateManyAndReturnArgs>(args: SelectSubset<T, frontend_event_logsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$frontend_event_logsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Frontend_event_logs.
     * @param {frontend_event_logsUpsertArgs} args - Arguments to update or create a Frontend_event_logs.
     * @example
     * // Update or create a Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.upsert({
     *   create: {
     *     // ... data to create a Frontend_event_logs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Frontend_event_logs we want to update
     *   }
     * })
     */
    upsert<T extends frontend_event_logsUpsertArgs>(args: SelectSubset<T, frontend_event_logsUpsertArgs<ExtArgs>>): Prisma__frontend_event_logsClient<$Result.GetResult<Prisma.$frontend_event_logsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Frontend_event_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {frontend_event_logsCountArgs} args - Arguments to filter Frontend_event_logs to count.
     * @example
     * // Count the number of Frontend_event_logs
     * const count = await prisma.frontend_event_logs.count({
     *   where: {
     *     // ... the filter for the Frontend_event_logs we want to count
     *   }
     * })
    **/
    count<T extends frontend_event_logsCountArgs>(
      args?: Subset<T, frontend_event_logsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Frontend_event_logsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Frontend_event_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Frontend_event_logsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Frontend_event_logsAggregateArgs>(args: Subset<T, Frontend_event_logsAggregateArgs>): Prisma.PrismaPromise<GetFrontend_event_logsAggregateType<T>>

    /**
     * Group by Frontend_event_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {frontend_event_logsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends frontend_event_logsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: frontend_event_logsGroupByArgs['orderBy'] }
        : { orderBy?: frontend_event_logsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, frontend_event_logsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFrontend_event_logsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the frontend_event_logs model
   */
  readonly fields: frontend_event_logsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for frontend_event_logs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__frontend_event_logsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the frontend_event_logs model
   */
  interface frontend_event_logsFieldRefs {
    readonly id: FieldRef<"frontend_event_logs", 'String'>
    readonly user_id: FieldRef<"frontend_event_logs", 'String'>
    readonly event_name: FieldRef<"frontend_event_logs", 'String'>
    readonly error_level: FieldRef<"frontend_event_logs", 'frontend_event_logs_error_level'>
    readonly screen_name: FieldRef<"frontend_event_logs", 'String'>
    readonly payload: FieldRef<"frontend_event_logs", 'String'>
    readonly created_at: FieldRef<"frontend_event_logs", 'DateTime'>
    readonly created_app_version: FieldRef<"frontend_event_logs", 'String'>
    readonly created_commit_id: FieldRef<"frontend_event_logs", 'String'>
  }
    

  // Custom InputTypes
  /**
   * frontend_event_logs findUnique
   */
  export type frontend_event_logsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
    /**
     * Filter, which frontend_event_logs to fetch.
     */
    where: frontend_event_logsWhereUniqueInput
  }

  /**
   * frontend_event_logs findUniqueOrThrow
   */
  export type frontend_event_logsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
    /**
     * Filter, which frontend_event_logs to fetch.
     */
    where: frontend_event_logsWhereUniqueInput
  }

  /**
   * frontend_event_logs findFirst
   */
  export type frontend_event_logsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
    /**
     * Filter, which frontend_event_logs to fetch.
     */
    where?: frontend_event_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of frontend_event_logs to fetch.
     */
    orderBy?: frontend_event_logsOrderByWithRelationInput | frontend_event_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for frontend_event_logs.
     */
    cursor?: frontend_event_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` frontend_event_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` frontend_event_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of frontend_event_logs.
     */
    distinct?: Frontend_event_logsScalarFieldEnum | Frontend_event_logsScalarFieldEnum[]
  }

  /**
   * frontend_event_logs findFirstOrThrow
   */
  export type frontend_event_logsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
    /**
     * Filter, which frontend_event_logs to fetch.
     */
    where?: frontend_event_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of frontend_event_logs to fetch.
     */
    orderBy?: frontend_event_logsOrderByWithRelationInput | frontend_event_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for frontend_event_logs.
     */
    cursor?: frontend_event_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` frontend_event_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` frontend_event_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of frontend_event_logs.
     */
    distinct?: Frontend_event_logsScalarFieldEnum | Frontend_event_logsScalarFieldEnum[]
  }

  /**
   * frontend_event_logs findMany
   */
  export type frontend_event_logsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
    /**
     * Filter, which frontend_event_logs to fetch.
     */
    where?: frontend_event_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of frontend_event_logs to fetch.
     */
    orderBy?: frontend_event_logsOrderByWithRelationInput | frontend_event_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing frontend_event_logs.
     */
    cursor?: frontend_event_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` frontend_event_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` frontend_event_logs.
     */
    skip?: number
    distinct?: Frontend_event_logsScalarFieldEnum | Frontend_event_logsScalarFieldEnum[]
  }

  /**
   * frontend_event_logs create
   */
  export type frontend_event_logsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
    /**
     * The data needed to create a frontend_event_logs.
     */
    data: XOR<frontend_event_logsCreateInput, frontend_event_logsUncheckedCreateInput>
  }

  /**
   * frontend_event_logs createMany
   */
  export type frontend_event_logsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many frontend_event_logs.
     */
    data: frontend_event_logsCreateManyInput | frontend_event_logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * frontend_event_logs createManyAndReturn
   */
  export type frontend_event_logsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
    /**
     * The data used to create many frontend_event_logs.
     */
    data: frontend_event_logsCreateManyInput | frontend_event_logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * frontend_event_logs update
   */
  export type frontend_event_logsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
    /**
     * The data needed to update a frontend_event_logs.
     */
    data: XOR<frontend_event_logsUpdateInput, frontend_event_logsUncheckedUpdateInput>
    /**
     * Choose, which frontend_event_logs to update.
     */
    where: frontend_event_logsWhereUniqueInput
  }

  /**
   * frontend_event_logs updateMany
   */
  export type frontend_event_logsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update frontend_event_logs.
     */
    data: XOR<frontend_event_logsUpdateManyMutationInput, frontend_event_logsUncheckedUpdateManyInput>
    /**
     * Filter which frontend_event_logs to update
     */
    where?: frontend_event_logsWhereInput
    /**
     * Limit how many frontend_event_logs to update.
     */
    limit?: number
  }

  /**
   * frontend_event_logs updateManyAndReturn
   */
  export type frontend_event_logsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
    /**
     * The data used to update frontend_event_logs.
     */
    data: XOR<frontend_event_logsUpdateManyMutationInput, frontend_event_logsUncheckedUpdateManyInput>
    /**
     * Filter which frontend_event_logs to update
     */
    where?: frontend_event_logsWhereInput
    /**
     * Limit how many frontend_event_logs to update.
     */
    limit?: number
  }

  /**
   * frontend_event_logs upsert
   */
  export type frontend_event_logsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
    /**
     * The filter to search for the frontend_event_logs to update in case it exists.
     */
    where: frontend_event_logsWhereUniqueInput
    /**
     * In case the frontend_event_logs found by the `where` argument doesn't exist, create a new frontend_event_logs with this data.
     */
    create: XOR<frontend_event_logsCreateInput, frontend_event_logsUncheckedCreateInput>
    /**
     * In case the frontend_event_logs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<frontend_event_logsUpdateInput, frontend_event_logsUncheckedUpdateInput>
  }

  /**
   * frontend_event_logs delete
   */
  export type frontend_event_logsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
    /**
     * Filter which frontend_event_logs to delete.
     */
    where: frontend_event_logsWhereUniqueInput
  }

  /**
   * frontend_event_logs deleteMany
   */
  export type frontend_event_logsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which frontend_event_logs to delete
     */
    where?: frontend_event_logsWhereInput
    /**
     * Limit how many frontend_event_logs to delete.
     */
    limit?: number
  }

  /**
   * frontend_event_logs without action
   */
  export type frontend_event_logsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
  }


  /**
   * Model spot_guides
   */

  export type AggregateSpot_guides = {
    _count: Spot_guidesCountAggregateOutputType | null
    _avg: Spot_guidesAvgAggregateOutputType | null
    _sum: Spot_guidesSumAggregateOutputType | null
    _min: Spot_guidesMinAggregateOutputType | null
    _max: Spot_guidesMaxAggregateOutputType | null
  }

  export type Spot_guidesAvgAggregateOutputType = {
    price_amount: Decimal | null
    recommendation_weight: number | null
    min_version_major: number | null
    max_version_major: number | null
    lock_no: number | null
  }

  export type Spot_guidesSumAggregateOutputType = {
    price_amount: Decimal | null
    recommendation_weight: number | null
    min_version_major: number | null
    max_version_major: number | null
    lock_no: number | null
  }

  export type Spot_guidesMinAggregateOutputType = {
    id: string | null
    spot_id: string | null
    lang: string | null
    title: string | null
    manuscript: string | null
    audio_storage_path: string | null
    voice_type: $Enums.spot_guides_voice_type | null
    price_amount: Decimal | null
    currency: string | null
    recommendation_weight: number | null
    min_version_major: number | null
    max_version_major: number | null
    created_by: string | null
    created_at: Date | null
    created_request_id: string | null
    lock_no: number | null
  }

  export type Spot_guidesMaxAggregateOutputType = {
    id: string | null
    spot_id: string | null
    lang: string | null
    title: string | null
    manuscript: string | null
    audio_storage_path: string | null
    voice_type: $Enums.spot_guides_voice_type | null
    price_amount: Decimal | null
    currency: string | null
    recommendation_weight: number | null
    min_version_major: number | null
    max_version_major: number | null
    created_by: string | null
    created_at: Date | null
    created_request_id: string | null
    lock_no: number | null
  }

  export type Spot_guidesCountAggregateOutputType = {
    id: number
    spot_id: number
    lang: number
    title: number
    manuscript: number
    audio_storage_path: number
    voice_type: number
    tags: number
    price_amount: number
    currency: number
    recommendation_weight: number
    min_version_major: number
    max_version_major: number
    created_by: number
    created_at: number
    created_request_id: number
    lock_no: number
    _all: number
  }


  export type Spot_guidesAvgAggregateInputType = {
    price_amount?: true
    recommendation_weight?: true
    min_version_major?: true
    max_version_major?: true
    lock_no?: true
  }

  export type Spot_guidesSumAggregateInputType = {
    price_amount?: true
    recommendation_weight?: true
    min_version_major?: true
    max_version_major?: true
    lock_no?: true
  }

  export type Spot_guidesMinAggregateInputType = {
    id?: true
    spot_id?: true
    lang?: true
    title?: true
    manuscript?: true
    audio_storage_path?: true
    voice_type?: true
    price_amount?: true
    currency?: true
    recommendation_weight?: true
    min_version_major?: true
    max_version_major?: true
    created_by?: true
    created_at?: true
    created_request_id?: true
    lock_no?: true
  }

  export type Spot_guidesMaxAggregateInputType = {
    id?: true
    spot_id?: true
    lang?: true
    title?: true
    manuscript?: true
    audio_storage_path?: true
    voice_type?: true
    price_amount?: true
    currency?: true
    recommendation_weight?: true
    min_version_major?: true
    max_version_major?: true
    created_by?: true
    created_at?: true
    created_request_id?: true
    lock_no?: true
  }

  export type Spot_guidesCountAggregateInputType = {
    id?: true
    spot_id?: true
    lang?: true
    title?: true
    manuscript?: true
    audio_storage_path?: true
    voice_type?: true
    tags?: true
    price_amount?: true
    currency?: true
    recommendation_weight?: true
    min_version_major?: true
    max_version_major?: true
    created_by?: true
    created_at?: true
    created_request_id?: true
    lock_no?: true
    _all?: true
  }

  export type Spot_guidesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which spot_guides to aggregate.
     */
    where?: spot_guidesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spot_guides to fetch.
     */
    orderBy?: spot_guidesOrderByWithRelationInput | spot_guidesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: spot_guidesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spot_guides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spot_guides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned spot_guides
    **/
    _count?: true | Spot_guidesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Spot_guidesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Spot_guidesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Spot_guidesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Spot_guidesMaxAggregateInputType
  }

  export type GetSpot_guidesAggregateType<T extends Spot_guidesAggregateArgs> = {
        [P in keyof T & keyof AggregateSpot_guides]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpot_guides[P]>
      : GetScalarType<T[P], AggregateSpot_guides[P]>
  }




  export type spot_guidesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: spot_guidesWhereInput
    orderBy?: spot_guidesOrderByWithAggregationInput | spot_guidesOrderByWithAggregationInput[]
    by: Spot_guidesScalarFieldEnum[] | Spot_guidesScalarFieldEnum
    having?: spot_guidesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Spot_guidesCountAggregateInputType | true
    _avg?: Spot_guidesAvgAggregateInputType
    _sum?: Spot_guidesSumAggregateInputType
    _min?: Spot_guidesMinAggregateInputType
    _max?: Spot_guidesMaxAggregateInputType
  }

  export type Spot_guidesGroupByOutputType = {
    id: string
    spot_id: string
    lang: string
    title: string
    manuscript: string
    audio_storage_path: string
    voice_type: $Enums.spot_guides_voice_type
    tags: string[]
    price_amount: Decimal
    currency: string
    recommendation_weight: number
    min_version_major: number
    max_version_major: number
    created_by: string
    created_at: Date
    created_request_id: string
    lock_no: number
    _count: Spot_guidesCountAggregateOutputType | null
    _avg: Spot_guidesAvgAggregateOutputType | null
    _sum: Spot_guidesSumAggregateOutputType | null
    _min: Spot_guidesMinAggregateOutputType | null
    _max: Spot_guidesMaxAggregateOutputType | null
  }

  type GetSpot_guidesGroupByPayload<T extends spot_guidesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Spot_guidesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Spot_guidesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Spot_guidesGroupByOutputType[P]>
            : GetScalarType<T[P], Spot_guidesGroupByOutputType[P]>
        }
      >
    >


  export type spot_guidesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    spot_id?: boolean
    lang?: boolean
    title?: boolean
    manuscript?: boolean
    audio_storage_path?: boolean
    voice_type?: boolean
    tags?: boolean
    price_amount?: boolean
    currency?: boolean
    recommendation_weight?: boolean
    min_version_major?: boolean
    max_version_major?: boolean
    created_by?: boolean
    created_at?: boolean
    created_request_id?: boolean
    lock_no?: boolean
    ext_spots?: boolean | ext_spotsDefaultArgs<ExtArgs>
    spot_visits?: boolean | spot_guides$spot_visitsArgs<ExtArgs>
    _count?: boolean | Spot_guidesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spot_guides"]>

  export type spot_guidesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    spot_id?: boolean
    lang?: boolean
    title?: boolean
    manuscript?: boolean
    audio_storage_path?: boolean
    voice_type?: boolean
    tags?: boolean
    price_amount?: boolean
    currency?: boolean
    recommendation_weight?: boolean
    min_version_major?: boolean
    max_version_major?: boolean
    created_by?: boolean
    created_at?: boolean
    created_request_id?: boolean
    lock_no?: boolean
    ext_spots?: boolean | ext_spotsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spot_guides"]>

  export type spot_guidesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    spot_id?: boolean
    lang?: boolean
    title?: boolean
    manuscript?: boolean
    audio_storage_path?: boolean
    voice_type?: boolean
    tags?: boolean
    price_amount?: boolean
    currency?: boolean
    recommendation_weight?: boolean
    min_version_major?: boolean
    max_version_major?: boolean
    created_by?: boolean
    created_at?: boolean
    created_request_id?: boolean
    lock_no?: boolean
    ext_spots?: boolean | ext_spotsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spot_guides"]>

  export type spot_guidesSelectScalar = {
    id?: boolean
    spot_id?: boolean
    lang?: boolean
    title?: boolean
    manuscript?: boolean
    audio_storage_path?: boolean
    voice_type?: boolean
    tags?: boolean
    price_amount?: boolean
    currency?: boolean
    recommendation_weight?: boolean
    min_version_major?: boolean
    max_version_major?: boolean
    created_by?: boolean
    created_at?: boolean
    created_request_id?: boolean
    lock_no?: boolean
  }

  export type spot_guidesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "spot_id" | "lang" | "title" | "manuscript" | "audio_storage_path" | "voice_type" | "tags" | "price_amount" | "currency" | "recommendation_weight" | "min_version_major" | "max_version_major" | "created_by" | "created_at" | "created_request_id" | "lock_no", ExtArgs["result"]["spot_guides"]>
  export type spot_guidesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ext_spots?: boolean | ext_spotsDefaultArgs<ExtArgs>
    spot_visits?: boolean | spot_guides$spot_visitsArgs<ExtArgs>
    _count?: boolean | Spot_guidesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type spot_guidesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ext_spots?: boolean | ext_spotsDefaultArgs<ExtArgs>
  }
  export type spot_guidesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ext_spots?: boolean | ext_spotsDefaultArgs<ExtArgs>
  }

  export type $spot_guidesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "spot_guides"
    objects: {
      ext_spots: Prisma.$ext_spotsPayload<ExtArgs>
      spot_visits: Prisma.$spot_visitsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      spot_id: string
      lang: string
      title: string
      manuscript: string
      audio_storage_path: string
      voice_type: $Enums.spot_guides_voice_type
      tags: string[]
      price_amount: Prisma.Decimal
      currency: string
      recommendation_weight: number
      min_version_major: number
      max_version_major: number
      created_by: string
      created_at: Date
      created_request_id: string
      lock_no: number
    }, ExtArgs["result"]["spot_guides"]>
    composites: {}
  }

  type spot_guidesGetPayload<S extends boolean | null | undefined | spot_guidesDefaultArgs> = $Result.GetResult<Prisma.$spot_guidesPayload, S>

  type spot_guidesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<spot_guidesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Spot_guidesCountAggregateInputType | true
    }

  export interface spot_guidesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['spot_guides'], meta: { name: 'spot_guides' } }
    /**
     * Find zero or one Spot_guides that matches the filter.
     * @param {spot_guidesFindUniqueArgs} args - Arguments to find a Spot_guides
     * @example
     * // Get one Spot_guides
     * const spot_guides = await prisma.spot_guides.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends spot_guidesFindUniqueArgs>(args: SelectSubset<T, spot_guidesFindUniqueArgs<ExtArgs>>): Prisma__spot_guidesClient<$Result.GetResult<Prisma.$spot_guidesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Spot_guides that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {spot_guidesFindUniqueOrThrowArgs} args - Arguments to find a Spot_guides
     * @example
     * // Get one Spot_guides
     * const spot_guides = await prisma.spot_guides.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends spot_guidesFindUniqueOrThrowArgs>(args: SelectSubset<T, spot_guidesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__spot_guidesClient<$Result.GetResult<Prisma.$spot_guidesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Spot_guides that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spot_guidesFindFirstArgs} args - Arguments to find a Spot_guides
     * @example
     * // Get one Spot_guides
     * const spot_guides = await prisma.spot_guides.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends spot_guidesFindFirstArgs>(args?: SelectSubset<T, spot_guidesFindFirstArgs<ExtArgs>>): Prisma__spot_guidesClient<$Result.GetResult<Prisma.$spot_guidesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Spot_guides that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spot_guidesFindFirstOrThrowArgs} args - Arguments to find a Spot_guides
     * @example
     * // Get one Spot_guides
     * const spot_guides = await prisma.spot_guides.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends spot_guidesFindFirstOrThrowArgs>(args?: SelectSubset<T, spot_guidesFindFirstOrThrowArgs<ExtArgs>>): Prisma__spot_guidesClient<$Result.GetResult<Prisma.$spot_guidesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Spot_guides that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spot_guidesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Spot_guides
     * const spot_guides = await prisma.spot_guides.findMany()
     * 
     * // Get first 10 Spot_guides
     * const spot_guides = await prisma.spot_guides.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const spot_guidesWithIdOnly = await prisma.spot_guides.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends spot_guidesFindManyArgs>(args?: SelectSubset<T, spot_guidesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spot_guidesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Spot_guides.
     * @param {spot_guidesCreateArgs} args - Arguments to create a Spot_guides.
     * @example
     * // Create one Spot_guides
     * const Spot_guides = await prisma.spot_guides.create({
     *   data: {
     *     // ... data to create a Spot_guides
     *   }
     * })
     * 
     */
    create<T extends spot_guidesCreateArgs>(args: SelectSubset<T, spot_guidesCreateArgs<ExtArgs>>): Prisma__spot_guidesClient<$Result.GetResult<Prisma.$spot_guidesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Spot_guides.
     * @param {spot_guidesCreateManyArgs} args - Arguments to create many Spot_guides.
     * @example
     * // Create many Spot_guides
     * const spot_guides = await prisma.spot_guides.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends spot_guidesCreateManyArgs>(args?: SelectSubset<T, spot_guidesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Spot_guides and returns the data saved in the database.
     * @param {spot_guidesCreateManyAndReturnArgs} args - Arguments to create many Spot_guides.
     * @example
     * // Create many Spot_guides
     * const spot_guides = await prisma.spot_guides.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Spot_guides and only return the `id`
     * const spot_guidesWithIdOnly = await prisma.spot_guides.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends spot_guidesCreateManyAndReturnArgs>(args?: SelectSubset<T, spot_guidesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spot_guidesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Spot_guides.
     * @param {spot_guidesDeleteArgs} args - Arguments to delete one Spot_guides.
     * @example
     * // Delete one Spot_guides
     * const Spot_guides = await prisma.spot_guides.delete({
     *   where: {
     *     // ... filter to delete one Spot_guides
     *   }
     * })
     * 
     */
    delete<T extends spot_guidesDeleteArgs>(args: SelectSubset<T, spot_guidesDeleteArgs<ExtArgs>>): Prisma__spot_guidesClient<$Result.GetResult<Prisma.$spot_guidesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Spot_guides.
     * @param {spot_guidesUpdateArgs} args - Arguments to update one Spot_guides.
     * @example
     * // Update one Spot_guides
     * const spot_guides = await prisma.spot_guides.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends spot_guidesUpdateArgs>(args: SelectSubset<T, spot_guidesUpdateArgs<ExtArgs>>): Prisma__spot_guidesClient<$Result.GetResult<Prisma.$spot_guidesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Spot_guides.
     * @param {spot_guidesDeleteManyArgs} args - Arguments to filter Spot_guides to delete.
     * @example
     * // Delete a few Spot_guides
     * const { count } = await prisma.spot_guides.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends spot_guidesDeleteManyArgs>(args?: SelectSubset<T, spot_guidesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spot_guides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spot_guidesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Spot_guides
     * const spot_guides = await prisma.spot_guides.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends spot_guidesUpdateManyArgs>(args: SelectSubset<T, spot_guidesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spot_guides and returns the data updated in the database.
     * @param {spot_guidesUpdateManyAndReturnArgs} args - Arguments to update many Spot_guides.
     * @example
     * // Update many Spot_guides
     * const spot_guides = await prisma.spot_guides.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Spot_guides and only return the `id`
     * const spot_guidesWithIdOnly = await prisma.spot_guides.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends spot_guidesUpdateManyAndReturnArgs>(args: SelectSubset<T, spot_guidesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spot_guidesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Spot_guides.
     * @param {spot_guidesUpsertArgs} args - Arguments to update or create a Spot_guides.
     * @example
     * // Update or create a Spot_guides
     * const spot_guides = await prisma.spot_guides.upsert({
     *   create: {
     *     // ... data to create a Spot_guides
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Spot_guides we want to update
     *   }
     * })
     */
    upsert<T extends spot_guidesUpsertArgs>(args: SelectSubset<T, spot_guidesUpsertArgs<ExtArgs>>): Prisma__spot_guidesClient<$Result.GetResult<Prisma.$spot_guidesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Spot_guides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spot_guidesCountArgs} args - Arguments to filter Spot_guides to count.
     * @example
     * // Count the number of Spot_guides
     * const count = await prisma.spot_guides.count({
     *   where: {
     *     // ... the filter for the Spot_guides we want to count
     *   }
     * })
    **/
    count<T extends spot_guidesCountArgs>(
      args?: Subset<T, spot_guidesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Spot_guidesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Spot_guides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Spot_guidesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Spot_guidesAggregateArgs>(args: Subset<T, Spot_guidesAggregateArgs>): Prisma.PrismaPromise<GetSpot_guidesAggregateType<T>>

    /**
     * Group by Spot_guides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spot_guidesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends spot_guidesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: spot_guidesGroupByArgs['orderBy'] }
        : { orderBy?: spot_guidesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, spot_guidesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpot_guidesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the spot_guides model
   */
  readonly fields: spot_guidesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for spot_guides.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__spot_guidesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ext_spots<T extends ext_spotsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ext_spotsDefaultArgs<ExtArgs>>): Prisma__ext_spotsClient<$Result.GetResult<Prisma.$ext_spotsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    spot_visits<T extends spot_guides$spot_visitsArgs<ExtArgs> = {}>(args?: Subset<T, spot_guides$spot_visitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spot_visitsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the spot_guides model
   */
  interface spot_guidesFieldRefs {
    readonly id: FieldRef<"spot_guides", 'String'>
    readonly spot_id: FieldRef<"spot_guides", 'String'>
    readonly lang: FieldRef<"spot_guides", 'String'>
    readonly title: FieldRef<"spot_guides", 'String'>
    readonly manuscript: FieldRef<"spot_guides", 'String'>
    readonly audio_storage_path: FieldRef<"spot_guides", 'String'>
    readonly voice_type: FieldRef<"spot_guides", 'spot_guides_voice_type'>
    readonly tags: FieldRef<"spot_guides", 'String[]'>
    readonly price_amount: FieldRef<"spot_guides", 'Decimal'>
    readonly currency: FieldRef<"spot_guides", 'String'>
    readonly recommendation_weight: FieldRef<"spot_guides", 'Int'>
    readonly min_version_major: FieldRef<"spot_guides", 'Int'>
    readonly max_version_major: FieldRef<"spot_guides", 'Int'>
    readonly created_by: FieldRef<"spot_guides", 'String'>
    readonly created_at: FieldRef<"spot_guides", 'DateTime'>
    readonly created_request_id: FieldRef<"spot_guides", 'String'>
    readonly lock_no: FieldRef<"spot_guides", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * spot_guides findUnique
   */
  export type spot_guidesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_guides
     */
    select?: spot_guidesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_guides
     */
    omit?: spot_guidesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_guidesInclude<ExtArgs> | null
    /**
     * Filter, which spot_guides to fetch.
     */
    where: spot_guidesWhereUniqueInput
  }

  /**
   * spot_guides findUniqueOrThrow
   */
  export type spot_guidesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_guides
     */
    select?: spot_guidesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_guides
     */
    omit?: spot_guidesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_guidesInclude<ExtArgs> | null
    /**
     * Filter, which spot_guides to fetch.
     */
    where: spot_guidesWhereUniqueInput
  }

  /**
   * spot_guides findFirst
   */
  export type spot_guidesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_guides
     */
    select?: spot_guidesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_guides
     */
    omit?: spot_guidesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_guidesInclude<ExtArgs> | null
    /**
     * Filter, which spot_guides to fetch.
     */
    where?: spot_guidesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spot_guides to fetch.
     */
    orderBy?: spot_guidesOrderByWithRelationInput | spot_guidesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for spot_guides.
     */
    cursor?: spot_guidesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spot_guides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spot_guides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of spot_guides.
     */
    distinct?: Spot_guidesScalarFieldEnum | Spot_guidesScalarFieldEnum[]
  }

  /**
   * spot_guides findFirstOrThrow
   */
  export type spot_guidesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_guides
     */
    select?: spot_guidesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_guides
     */
    omit?: spot_guidesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_guidesInclude<ExtArgs> | null
    /**
     * Filter, which spot_guides to fetch.
     */
    where?: spot_guidesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spot_guides to fetch.
     */
    orderBy?: spot_guidesOrderByWithRelationInput | spot_guidesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for spot_guides.
     */
    cursor?: spot_guidesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spot_guides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spot_guides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of spot_guides.
     */
    distinct?: Spot_guidesScalarFieldEnum | Spot_guidesScalarFieldEnum[]
  }

  /**
   * spot_guides findMany
   */
  export type spot_guidesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_guides
     */
    select?: spot_guidesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_guides
     */
    omit?: spot_guidesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_guidesInclude<ExtArgs> | null
    /**
     * Filter, which spot_guides to fetch.
     */
    where?: spot_guidesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spot_guides to fetch.
     */
    orderBy?: spot_guidesOrderByWithRelationInput | spot_guidesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing spot_guides.
     */
    cursor?: spot_guidesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spot_guides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spot_guides.
     */
    skip?: number
    distinct?: Spot_guidesScalarFieldEnum | Spot_guidesScalarFieldEnum[]
  }

  /**
   * spot_guides create
   */
  export type spot_guidesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_guides
     */
    select?: spot_guidesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_guides
     */
    omit?: spot_guidesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_guidesInclude<ExtArgs> | null
    /**
     * The data needed to create a spot_guides.
     */
    data: XOR<spot_guidesCreateInput, spot_guidesUncheckedCreateInput>
  }

  /**
   * spot_guides createMany
   */
  export type spot_guidesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many spot_guides.
     */
    data: spot_guidesCreateManyInput | spot_guidesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * spot_guides createManyAndReturn
   */
  export type spot_guidesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_guides
     */
    select?: spot_guidesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the spot_guides
     */
    omit?: spot_guidesOmit<ExtArgs> | null
    /**
     * The data used to create many spot_guides.
     */
    data: spot_guidesCreateManyInput | spot_guidesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_guidesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * spot_guides update
   */
  export type spot_guidesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_guides
     */
    select?: spot_guidesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_guides
     */
    omit?: spot_guidesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_guidesInclude<ExtArgs> | null
    /**
     * The data needed to update a spot_guides.
     */
    data: XOR<spot_guidesUpdateInput, spot_guidesUncheckedUpdateInput>
    /**
     * Choose, which spot_guides to update.
     */
    where: spot_guidesWhereUniqueInput
  }

  /**
   * spot_guides updateMany
   */
  export type spot_guidesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update spot_guides.
     */
    data: XOR<spot_guidesUpdateManyMutationInput, spot_guidesUncheckedUpdateManyInput>
    /**
     * Filter which spot_guides to update
     */
    where?: spot_guidesWhereInput
    /**
     * Limit how many spot_guides to update.
     */
    limit?: number
  }

  /**
   * spot_guides updateManyAndReturn
   */
  export type spot_guidesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_guides
     */
    select?: spot_guidesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the spot_guides
     */
    omit?: spot_guidesOmit<ExtArgs> | null
    /**
     * The data used to update spot_guides.
     */
    data: XOR<spot_guidesUpdateManyMutationInput, spot_guidesUncheckedUpdateManyInput>
    /**
     * Filter which spot_guides to update
     */
    where?: spot_guidesWhereInput
    /**
     * Limit how many spot_guides to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_guidesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * spot_guides upsert
   */
  export type spot_guidesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_guides
     */
    select?: spot_guidesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_guides
     */
    omit?: spot_guidesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_guidesInclude<ExtArgs> | null
    /**
     * The filter to search for the spot_guides to update in case it exists.
     */
    where: spot_guidesWhereUniqueInput
    /**
     * In case the spot_guides found by the `where` argument doesn't exist, create a new spot_guides with this data.
     */
    create: XOR<spot_guidesCreateInput, spot_guidesUncheckedCreateInput>
    /**
     * In case the spot_guides was found with the provided `where` argument, update it with this data.
     */
    update: XOR<spot_guidesUpdateInput, spot_guidesUncheckedUpdateInput>
  }

  /**
   * spot_guides delete
   */
  export type spot_guidesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_guides
     */
    select?: spot_guidesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_guides
     */
    omit?: spot_guidesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_guidesInclude<ExtArgs> | null
    /**
     * Filter which spot_guides to delete.
     */
    where: spot_guidesWhereUniqueInput
  }

  /**
   * spot_guides deleteMany
   */
  export type spot_guidesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which spot_guides to delete
     */
    where?: spot_guidesWhereInput
    /**
     * Limit how many spot_guides to delete.
     */
    limit?: number
  }

  /**
   * spot_guides.spot_visits
   */
  export type spot_guides$spot_visitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_visits
     */
    select?: spot_visitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_visits
     */
    omit?: spot_visitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_visitsInclude<ExtArgs> | null
    where?: spot_visitsWhereInput
    orderBy?: spot_visitsOrderByWithRelationInput | spot_visitsOrderByWithRelationInput[]
    cursor?: spot_visitsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Spot_visitsScalarFieldEnum | Spot_visitsScalarFieldEnum[]
  }

  /**
   * spot_guides without action
   */
  export type spot_guidesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_guides
     */
    select?: spot_guidesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_guides
     */
    omit?: spot_guidesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_guidesInclude<ExtArgs> | null
  }


  /**
   * Model spot_visits
   */

  export type AggregateSpot_visits = {
    _count: Spot_visitsCountAggregateOutputType | null
    _avg: Spot_visitsAvgAggregateOutputType | null
    _sum: Spot_visitsSumAggregateOutputType | null
    _min: Spot_visitsMinAggregateOutputType | null
    _max: Spot_visitsMaxAggregateOutputType | null
  }

  export type Spot_visitsAvgAggregateOutputType = {
    time_gap_minutes: number | null
    min_version_major: number | null
    max_version_major: number | null
    lock_no: number | null
  }

  export type Spot_visitsSumAggregateOutputType = {
    time_gap_minutes: number | null
    min_version_major: number | null
    max_version_major: number | null
    lock_no: number | null
  }

  export type Spot_visitsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    spot_id: string | null
    represent_guide_id: string | null
    taken_photo_storage_path: string | null
    prev_spot_id: string | null
    time_gap_minutes: number | null
    min_version_major: number | null
    max_version_major: number | null
    created_at: Date | null
    updated_at: Date | null
    lock_no: number | null
  }

  export type Spot_visitsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    spot_id: string | null
    represent_guide_id: string | null
    taken_photo_storage_path: string | null
    prev_spot_id: string | null
    time_gap_minutes: number | null
    min_version_major: number | null
    max_version_major: number | null
    created_at: Date | null
    updated_at: Date | null
    lock_no: number | null
  }

  export type Spot_visitsCountAggregateOutputType = {
    id: number
    user_id: number
    spot_id: number
    represent_guide_id: number
    taken_photo_storage_path: number
    prev_spot_id: number
    time_gap_minutes: number
    min_version_major: number
    max_version_major: number
    created_at: number
    updated_at: number
    lock_no: number
    _all: number
  }


  export type Spot_visitsAvgAggregateInputType = {
    time_gap_minutes?: true
    min_version_major?: true
    max_version_major?: true
    lock_no?: true
  }

  export type Spot_visitsSumAggregateInputType = {
    time_gap_minutes?: true
    min_version_major?: true
    max_version_major?: true
    lock_no?: true
  }

  export type Spot_visitsMinAggregateInputType = {
    id?: true
    user_id?: true
    spot_id?: true
    represent_guide_id?: true
    taken_photo_storage_path?: true
    prev_spot_id?: true
    time_gap_minutes?: true
    min_version_major?: true
    max_version_major?: true
    created_at?: true
    updated_at?: true
    lock_no?: true
  }

  export type Spot_visitsMaxAggregateInputType = {
    id?: true
    user_id?: true
    spot_id?: true
    represent_guide_id?: true
    taken_photo_storage_path?: true
    prev_spot_id?: true
    time_gap_minutes?: true
    min_version_major?: true
    max_version_major?: true
    created_at?: true
    updated_at?: true
    lock_no?: true
  }

  export type Spot_visitsCountAggregateInputType = {
    id?: true
    user_id?: true
    spot_id?: true
    represent_guide_id?: true
    taken_photo_storage_path?: true
    prev_spot_id?: true
    time_gap_minutes?: true
    min_version_major?: true
    max_version_major?: true
    created_at?: true
    updated_at?: true
    lock_no?: true
    _all?: true
  }

  export type Spot_visitsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which spot_visits to aggregate.
     */
    where?: spot_visitsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spot_visits to fetch.
     */
    orderBy?: spot_visitsOrderByWithRelationInput | spot_visitsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: spot_visitsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spot_visits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spot_visits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned spot_visits
    **/
    _count?: true | Spot_visitsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Spot_visitsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Spot_visitsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Spot_visitsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Spot_visitsMaxAggregateInputType
  }

  export type GetSpot_visitsAggregateType<T extends Spot_visitsAggregateArgs> = {
        [P in keyof T & keyof AggregateSpot_visits]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpot_visits[P]>
      : GetScalarType<T[P], AggregateSpot_visits[P]>
  }




  export type spot_visitsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: spot_visitsWhereInput
    orderBy?: spot_visitsOrderByWithAggregationInput | spot_visitsOrderByWithAggregationInput[]
    by: Spot_visitsScalarFieldEnum[] | Spot_visitsScalarFieldEnum
    having?: spot_visitsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Spot_visitsCountAggregateInputType | true
    _avg?: Spot_visitsAvgAggregateInputType
    _sum?: Spot_visitsSumAggregateInputType
    _min?: Spot_visitsMinAggregateInputType
    _max?: Spot_visitsMaxAggregateInputType
  }

  export type Spot_visitsGroupByOutputType = {
    id: string
    user_id: string
    spot_id: string
    represent_guide_id: string
    taken_photo_storage_path: string | null
    prev_spot_id: string | null
    time_gap_minutes: number
    min_version_major: number
    max_version_major: number
    created_at: Date
    updated_at: Date
    lock_no: number
    _count: Spot_visitsCountAggregateOutputType | null
    _avg: Spot_visitsAvgAggregateOutputType | null
    _sum: Spot_visitsSumAggregateOutputType | null
    _min: Spot_visitsMinAggregateOutputType | null
    _max: Spot_visitsMaxAggregateOutputType | null
  }

  type GetSpot_visitsGroupByPayload<T extends spot_visitsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Spot_visitsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Spot_visitsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Spot_visitsGroupByOutputType[P]>
            : GetScalarType<T[P], Spot_visitsGroupByOutputType[P]>
        }
      >
    >


  export type spot_visitsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    spot_id?: boolean
    represent_guide_id?: boolean
    taken_photo_storage_path?: boolean
    prev_spot_id?: boolean
    time_gap_minutes?: boolean
    min_version_major?: boolean
    max_version_major?: boolean
    created_at?: boolean
    updated_at?: boolean
    lock_no?: boolean
    ext_spots_spot_visits_prev_spot_idToext_spots?: boolean | spot_visits$ext_spots_spot_visits_prev_spot_idToext_spotsArgs<ExtArgs>
    spot_guides?: boolean | spot_guidesDefaultArgs<ExtArgs>
    ext_spots_spot_visits_spot_idToext_spots?: boolean | ext_spotsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spot_visits"]>

  export type spot_visitsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    spot_id?: boolean
    represent_guide_id?: boolean
    taken_photo_storage_path?: boolean
    prev_spot_id?: boolean
    time_gap_minutes?: boolean
    min_version_major?: boolean
    max_version_major?: boolean
    created_at?: boolean
    updated_at?: boolean
    lock_no?: boolean
    ext_spots_spot_visits_prev_spot_idToext_spots?: boolean | spot_visits$ext_spots_spot_visits_prev_spot_idToext_spotsArgs<ExtArgs>
    spot_guides?: boolean | spot_guidesDefaultArgs<ExtArgs>
    ext_spots_spot_visits_spot_idToext_spots?: boolean | ext_spotsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spot_visits"]>

  export type spot_visitsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    spot_id?: boolean
    represent_guide_id?: boolean
    taken_photo_storage_path?: boolean
    prev_spot_id?: boolean
    time_gap_minutes?: boolean
    min_version_major?: boolean
    max_version_major?: boolean
    created_at?: boolean
    updated_at?: boolean
    lock_no?: boolean
    ext_spots_spot_visits_prev_spot_idToext_spots?: boolean | spot_visits$ext_spots_spot_visits_prev_spot_idToext_spotsArgs<ExtArgs>
    spot_guides?: boolean | spot_guidesDefaultArgs<ExtArgs>
    ext_spots_spot_visits_spot_idToext_spots?: boolean | ext_spotsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spot_visits"]>

  export type spot_visitsSelectScalar = {
    id?: boolean
    user_id?: boolean
    spot_id?: boolean
    represent_guide_id?: boolean
    taken_photo_storage_path?: boolean
    prev_spot_id?: boolean
    time_gap_minutes?: boolean
    min_version_major?: boolean
    max_version_major?: boolean
    created_at?: boolean
    updated_at?: boolean
    lock_no?: boolean
  }

  export type spot_visitsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "spot_id" | "represent_guide_id" | "taken_photo_storage_path" | "prev_spot_id" | "time_gap_minutes" | "min_version_major" | "max_version_major" | "created_at" | "updated_at" | "lock_no", ExtArgs["result"]["spot_visits"]>
  export type spot_visitsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ext_spots_spot_visits_prev_spot_idToext_spots?: boolean | spot_visits$ext_spots_spot_visits_prev_spot_idToext_spotsArgs<ExtArgs>
    spot_guides?: boolean | spot_guidesDefaultArgs<ExtArgs>
    ext_spots_spot_visits_spot_idToext_spots?: boolean | ext_spotsDefaultArgs<ExtArgs>
  }
  export type spot_visitsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ext_spots_spot_visits_prev_spot_idToext_spots?: boolean | spot_visits$ext_spots_spot_visits_prev_spot_idToext_spotsArgs<ExtArgs>
    spot_guides?: boolean | spot_guidesDefaultArgs<ExtArgs>
    ext_spots_spot_visits_spot_idToext_spots?: boolean | ext_spotsDefaultArgs<ExtArgs>
  }
  export type spot_visitsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ext_spots_spot_visits_prev_spot_idToext_spots?: boolean | spot_visits$ext_spots_spot_visits_prev_spot_idToext_spotsArgs<ExtArgs>
    spot_guides?: boolean | spot_guidesDefaultArgs<ExtArgs>
    ext_spots_spot_visits_spot_idToext_spots?: boolean | ext_spotsDefaultArgs<ExtArgs>
  }

  export type $spot_visitsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "spot_visits"
    objects: {
      ext_spots_spot_visits_prev_spot_idToext_spots: Prisma.$ext_spotsPayload<ExtArgs> | null
      spot_guides: Prisma.$spot_guidesPayload<ExtArgs>
      ext_spots_spot_visits_spot_idToext_spots: Prisma.$ext_spotsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      spot_id: string
      represent_guide_id: string
      taken_photo_storage_path: string | null
      prev_spot_id: string | null
      time_gap_minutes: number
      min_version_major: number
      max_version_major: number
      created_at: Date
      updated_at: Date
      lock_no: number
    }, ExtArgs["result"]["spot_visits"]>
    composites: {}
  }

  type spot_visitsGetPayload<S extends boolean | null | undefined | spot_visitsDefaultArgs> = $Result.GetResult<Prisma.$spot_visitsPayload, S>

  type spot_visitsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<spot_visitsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Spot_visitsCountAggregateInputType | true
    }

  export interface spot_visitsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['spot_visits'], meta: { name: 'spot_visits' } }
    /**
     * Find zero or one Spot_visits that matches the filter.
     * @param {spot_visitsFindUniqueArgs} args - Arguments to find a Spot_visits
     * @example
     * // Get one Spot_visits
     * const spot_visits = await prisma.spot_visits.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends spot_visitsFindUniqueArgs>(args: SelectSubset<T, spot_visitsFindUniqueArgs<ExtArgs>>): Prisma__spot_visitsClient<$Result.GetResult<Prisma.$spot_visitsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Spot_visits that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {spot_visitsFindUniqueOrThrowArgs} args - Arguments to find a Spot_visits
     * @example
     * // Get one Spot_visits
     * const spot_visits = await prisma.spot_visits.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends spot_visitsFindUniqueOrThrowArgs>(args: SelectSubset<T, spot_visitsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__spot_visitsClient<$Result.GetResult<Prisma.$spot_visitsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Spot_visits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spot_visitsFindFirstArgs} args - Arguments to find a Spot_visits
     * @example
     * // Get one Spot_visits
     * const spot_visits = await prisma.spot_visits.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends spot_visitsFindFirstArgs>(args?: SelectSubset<T, spot_visitsFindFirstArgs<ExtArgs>>): Prisma__spot_visitsClient<$Result.GetResult<Prisma.$spot_visitsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Spot_visits that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spot_visitsFindFirstOrThrowArgs} args - Arguments to find a Spot_visits
     * @example
     * // Get one Spot_visits
     * const spot_visits = await prisma.spot_visits.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends spot_visitsFindFirstOrThrowArgs>(args?: SelectSubset<T, spot_visitsFindFirstOrThrowArgs<ExtArgs>>): Prisma__spot_visitsClient<$Result.GetResult<Prisma.$spot_visitsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Spot_visits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spot_visitsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Spot_visits
     * const spot_visits = await prisma.spot_visits.findMany()
     * 
     * // Get first 10 Spot_visits
     * const spot_visits = await prisma.spot_visits.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const spot_visitsWithIdOnly = await prisma.spot_visits.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends spot_visitsFindManyArgs>(args?: SelectSubset<T, spot_visitsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spot_visitsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Spot_visits.
     * @param {spot_visitsCreateArgs} args - Arguments to create a Spot_visits.
     * @example
     * // Create one Spot_visits
     * const Spot_visits = await prisma.spot_visits.create({
     *   data: {
     *     // ... data to create a Spot_visits
     *   }
     * })
     * 
     */
    create<T extends spot_visitsCreateArgs>(args: SelectSubset<T, spot_visitsCreateArgs<ExtArgs>>): Prisma__spot_visitsClient<$Result.GetResult<Prisma.$spot_visitsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Spot_visits.
     * @param {spot_visitsCreateManyArgs} args - Arguments to create many Spot_visits.
     * @example
     * // Create many Spot_visits
     * const spot_visits = await prisma.spot_visits.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends spot_visitsCreateManyArgs>(args?: SelectSubset<T, spot_visitsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Spot_visits and returns the data saved in the database.
     * @param {spot_visitsCreateManyAndReturnArgs} args - Arguments to create many Spot_visits.
     * @example
     * // Create many Spot_visits
     * const spot_visits = await prisma.spot_visits.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Spot_visits and only return the `id`
     * const spot_visitsWithIdOnly = await prisma.spot_visits.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends spot_visitsCreateManyAndReturnArgs>(args?: SelectSubset<T, spot_visitsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spot_visitsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Spot_visits.
     * @param {spot_visitsDeleteArgs} args - Arguments to delete one Spot_visits.
     * @example
     * // Delete one Spot_visits
     * const Spot_visits = await prisma.spot_visits.delete({
     *   where: {
     *     // ... filter to delete one Spot_visits
     *   }
     * })
     * 
     */
    delete<T extends spot_visitsDeleteArgs>(args: SelectSubset<T, spot_visitsDeleteArgs<ExtArgs>>): Prisma__spot_visitsClient<$Result.GetResult<Prisma.$spot_visitsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Spot_visits.
     * @param {spot_visitsUpdateArgs} args - Arguments to update one Spot_visits.
     * @example
     * // Update one Spot_visits
     * const spot_visits = await prisma.spot_visits.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends spot_visitsUpdateArgs>(args: SelectSubset<T, spot_visitsUpdateArgs<ExtArgs>>): Prisma__spot_visitsClient<$Result.GetResult<Prisma.$spot_visitsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Spot_visits.
     * @param {spot_visitsDeleteManyArgs} args - Arguments to filter Spot_visits to delete.
     * @example
     * // Delete a few Spot_visits
     * const { count } = await prisma.spot_visits.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends spot_visitsDeleteManyArgs>(args?: SelectSubset<T, spot_visitsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spot_visits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spot_visitsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Spot_visits
     * const spot_visits = await prisma.spot_visits.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends spot_visitsUpdateManyArgs>(args: SelectSubset<T, spot_visitsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spot_visits and returns the data updated in the database.
     * @param {spot_visitsUpdateManyAndReturnArgs} args - Arguments to update many Spot_visits.
     * @example
     * // Update many Spot_visits
     * const spot_visits = await prisma.spot_visits.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Spot_visits and only return the `id`
     * const spot_visitsWithIdOnly = await prisma.spot_visits.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends spot_visitsUpdateManyAndReturnArgs>(args: SelectSubset<T, spot_visitsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spot_visitsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Spot_visits.
     * @param {spot_visitsUpsertArgs} args - Arguments to update or create a Spot_visits.
     * @example
     * // Update or create a Spot_visits
     * const spot_visits = await prisma.spot_visits.upsert({
     *   create: {
     *     // ... data to create a Spot_visits
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Spot_visits we want to update
     *   }
     * })
     */
    upsert<T extends spot_visitsUpsertArgs>(args: SelectSubset<T, spot_visitsUpsertArgs<ExtArgs>>): Prisma__spot_visitsClient<$Result.GetResult<Prisma.$spot_visitsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Spot_visits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spot_visitsCountArgs} args - Arguments to filter Spot_visits to count.
     * @example
     * // Count the number of Spot_visits
     * const count = await prisma.spot_visits.count({
     *   where: {
     *     // ... the filter for the Spot_visits we want to count
     *   }
     * })
    **/
    count<T extends spot_visitsCountArgs>(
      args?: Subset<T, spot_visitsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Spot_visitsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Spot_visits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Spot_visitsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Spot_visitsAggregateArgs>(args: Subset<T, Spot_visitsAggregateArgs>): Prisma.PrismaPromise<GetSpot_visitsAggregateType<T>>

    /**
     * Group by Spot_visits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spot_visitsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends spot_visitsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: spot_visitsGroupByArgs['orderBy'] }
        : { orderBy?: spot_visitsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, spot_visitsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpot_visitsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the spot_visits model
   */
  readonly fields: spot_visitsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for spot_visits.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__spot_visitsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ext_spots_spot_visits_prev_spot_idToext_spots<T extends spot_visits$ext_spots_spot_visits_prev_spot_idToext_spotsArgs<ExtArgs> = {}>(args?: Subset<T, spot_visits$ext_spots_spot_visits_prev_spot_idToext_spotsArgs<ExtArgs>>): Prisma__ext_spotsClient<$Result.GetResult<Prisma.$ext_spotsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    spot_guides<T extends spot_guidesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, spot_guidesDefaultArgs<ExtArgs>>): Prisma__spot_guidesClient<$Result.GetResult<Prisma.$spot_guidesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    ext_spots_spot_visits_spot_idToext_spots<T extends ext_spotsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ext_spotsDefaultArgs<ExtArgs>>): Prisma__ext_spotsClient<$Result.GetResult<Prisma.$ext_spotsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the spot_visits model
   */
  interface spot_visitsFieldRefs {
    readonly id: FieldRef<"spot_visits", 'String'>
    readonly user_id: FieldRef<"spot_visits", 'String'>
    readonly spot_id: FieldRef<"spot_visits", 'String'>
    readonly represent_guide_id: FieldRef<"spot_visits", 'String'>
    readonly taken_photo_storage_path: FieldRef<"spot_visits", 'String'>
    readonly prev_spot_id: FieldRef<"spot_visits", 'String'>
    readonly time_gap_minutes: FieldRef<"spot_visits", 'Int'>
    readonly min_version_major: FieldRef<"spot_visits", 'Int'>
    readonly max_version_major: FieldRef<"spot_visits", 'Int'>
    readonly created_at: FieldRef<"spot_visits", 'DateTime'>
    readonly updated_at: FieldRef<"spot_visits", 'DateTime'>
    readonly lock_no: FieldRef<"spot_visits", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * spot_visits findUnique
   */
  export type spot_visitsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_visits
     */
    select?: spot_visitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_visits
     */
    omit?: spot_visitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_visitsInclude<ExtArgs> | null
    /**
     * Filter, which spot_visits to fetch.
     */
    where: spot_visitsWhereUniqueInput
  }

  /**
   * spot_visits findUniqueOrThrow
   */
  export type spot_visitsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_visits
     */
    select?: spot_visitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_visits
     */
    omit?: spot_visitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_visitsInclude<ExtArgs> | null
    /**
     * Filter, which spot_visits to fetch.
     */
    where: spot_visitsWhereUniqueInput
  }

  /**
   * spot_visits findFirst
   */
  export type spot_visitsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_visits
     */
    select?: spot_visitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_visits
     */
    omit?: spot_visitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_visitsInclude<ExtArgs> | null
    /**
     * Filter, which spot_visits to fetch.
     */
    where?: spot_visitsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spot_visits to fetch.
     */
    orderBy?: spot_visitsOrderByWithRelationInput | spot_visitsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for spot_visits.
     */
    cursor?: spot_visitsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spot_visits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spot_visits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of spot_visits.
     */
    distinct?: Spot_visitsScalarFieldEnum | Spot_visitsScalarFieldEnum[]
  }

  /**
   * spot_visits findFirstOrThrow
   */
  export type spot_visitsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_visits
     */
    select?: spot_visitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_visits
     */
    omit?: spot_visitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_visitsInclude<ExtArgs> | null
    /**
     * Filter, which spot_visits to fetch.
     */
    where?: spot_visitsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spot_visits to fetch.
     */
    orderBy?: spot_visitsOrderByWithRelationInput | spot_visitsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for spot_visits.
     */
    cursor?: spot_visitsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spot_visits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spot_visits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of spot_visits.
     */
    distinct?: Spot_visitsScalarFieldEnum | Spot_visitsScalarFieldEnum[]
  }

  /**
   * spot_visits findMany
   */
  export type spot_visitsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_visits
     */
    select?: spot_visitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_visits
     */
    omit?: spot_visitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_visitsInclude<ExtArgs> | null
    /**
     * Filter, which spot_visits to fetch.
     */
    where?: spot_visitsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spot_visits to fetch.
     */
    orderBy?: spot_visitsOrderByWithRelationInput | spot_visitsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing spot_visits.
     */
    cursor?: spot_visitsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spot_visits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spot_visits.
     */
    skip?: number
    distinct?: Spot_visitsScalarFieldEnum | Spot_visitsScalarFieldEnum[]
  }

  /**
   * spot_visits create
   */
  export type spot_visitsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_visits
     */
    select?: spot_visitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_visits
     */
    omit?: spot_visitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_visitsInclude<ExtArgs> | null
    /**
     * The data needed to create a spot_visits.
     */
    data: XOR<spot_visitsCreateInput, spot_visitsUncheckedCreateInput>
  }

  /**
   * spot_visits createMany
   */
  export type spot_visitsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many spot_visits.
     */
    data: spot_visitsCreateManyInput | spot_visitsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * spot_visits createManyAndReturn
   */
  export type spot_visitsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_visits
     */
    select?: spot_visitsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the spot_visits
     */
    omit?: spot_visitsOmit<ExtArgs> | null
    /**
     * The data used to create many spot_visits.
     */
    data: spot_visitsCreateManyInput | spot_visitsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_visitsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * spot_visits update
   */
  export type spot_visitsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_visits
     */
    select?: spot_visitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_visits
     */
    omit?: spot_visitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_visitsInclude<ExtArgs> | null
    /**
     * The data needed to update a spot_visits.
     */
    data: XOR<spot_visitsUpdateInput, spot_visitsUncheckedUpdateInput>
    /**
     * Choose, which spot_visits to update.
     */
    where: spot_visitsWhereUniqueInput
  }

  /**
   * spot_visits updateMany
   */
  export type spot_visitsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update spot_visits.
     */
    data: XOR<spot_visitsUpdateManyMutationInput, spot_visitsUncheckedUpdateManyInput>
    /**
     * Filter which spot_visits to update
     */
    where?: spot_visitsWhereInput
    /**
     * Limit how many spot_visits to update.
     */
    limit?: number
  }

  /**
   * spot_visits updateManyAndReturn
   */
  export type spot_visitsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_visits
     */
    select?: spot_visitsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the spot_visits
     */
    omit?: spot_visitsOmit<ExtArgs> | null
    /**
     * The data used to update spot_visits.
     */
    data: XOR<spot_visitsUpdateManyMutationInput, spot_visitsUncheckedUpdateManyInput>
    /**
     * Filter which spot_visits to update
     */
    where?: spot_visitsWhereInput
    /**
     * Limit how many spot_visits to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_visitsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * spot_visits upsert
   */
  export type spot_visitsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_visits
     */
    select?: spot_visitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_visits
     */
    omit?: spot_visitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_visitsInclude<ExtArgs> | null
    /**
     * The filter to search for the spot_visits to update in case it exists.
     */
    where: spot_visitsWhereUniqueInput
    /**
     * In case the spot_visits found by the `where` argument doesn't exist, create a new spot_visits with this data.
     */
    create: XOR<spot_visitsCreateInput, spot_visitsUncheckedCreateInput>
    /**
     * In case the spot_visits was found with the provided `where` argument, update it with this data.
     */
    update: XOR<spot_visitsUpdateInput, spot_visitsUncheckedUpdateInput>
  }

  /**
   * spot_visits delete
   */
  export type spot_visitsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_visits
     */
    select?: spot_visitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_visits
     */
    omit?: spot_visitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_visitsInclude<ExtArgs> | null
    /**
     * Filter which spot_visits to delete.
     */
    where: spot_visitsWhereUniqueInput
  }

  /**
   * spot_visits deleteMany
   */
  export type spot_visitsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which spot_visits to delete
     */
    where?: spot_visitsWhereInput
    /**
     * Limit how many spot_visits to delete.
     */
    limit?: number
  }

  /**
   * spot_visits.ext_spots_spot_visits_prev_spot_idToext_spots
   */
  export type spot_visits$ext_spots_spot_visits_prev_spot_idToext_spotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ext_spots
     */
    select?: ext_spotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ext_spots
     */
    omit?: ext_spotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ext_spotsInclude<ExtArgs> | null
    where?: ext_spotsWhereInput
  }

  /**
   * spot_visits without action
   */
  export type spot_visitsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spot_visits
     */
    select?: spot_visitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spot_visits
     */
    omit?: spot_visitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spot_visitsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Backend_event_logsScalarFieldEnum: {
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

  export type Backend_event_logsScalarFieldEnum = (typeof Backend_event_logsScalarFieldEnum)[keyof typeof Backend_event_logsScalarFieldEnum]


  export const Ext_spotsScalarFieldEnum: {
    id: 'id',
    source_type: 'source_type',
    title: 'title',
    image_url: 'image_url',
    landmark_latitude: 'landmark_latitude',
    landmark_longitude: 'landmark_longitude',
    is_recommendable: 'is_recommendable',
    created_at: 'created_at',
    lock_no: 'lock_no'
  };

  export type Ext_spotsScalarFieldEnum = (typeof Ext_spotsScalarFieldEnum)[keyof typeof Ext_spotsScalarFieldEnum]


  export const External_api_logsScalarFieldEnum: {
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

  export type External_api_logsScalarFieldEnum = (typeof External_api_logsScalarFieldEnum)[keyof typeof External_api_logsScalarFieldEnum]


  export const Frontend_event_logsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    event_name: 'event_name',
    error_level: 'error_level',
    screen_name: 'screen_name',
    payload: 'payload',
    created_at: 'created_at',
    created_app_version: 'created_app_version',
    created_commit_id: 'created_commit_id'
  };

  export type Frontend_event_logsScalarFieldEnum = (typeof Frontend_event_logsScalarFieldEnum)[keyof typeof Frontend_event_logsScalarFieldEnum]


  export const Spot_guidesScalarFieldEnum: {
    id: 'id',
    spot_id: 'spot_id',
    lang: 'lang',
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

  export type Spot_guidesScalarFieldEnum = (typeof Spot_guidesScalarFieldEnum)[keyof typeof Spot_guidesScalarFieldEnum]


  export const Spot_visitsScalarFieldEnum: {
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

  export type Spot_visitsScalarFieldEnum = (typeof Spot_visitsScalarFieldEnum)[keyof typeof Spot_visitsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'backend_event_logs_error_level'
   */
  export type Enumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'backend_event_logs_error_level'>
    


  /**
   * Reference to a field of type 'backend_event_logs_error_level[]'
   */
  export type ListEnumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'backend_event_logs_error_level[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ext_spots_source_type'
   */
  export type Enumext_spots_source_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ext_spots_source_type'>
    


  /**
   * Reference to a field of type 'ext_spots_source_type[]'
   */
  export type ListEnumext_spots_source_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ext_spots_source_type[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'frontend_event_logs_error_level'
   */
  export type Enumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'frontend_event_logs_error_level'>
    


  /**
   * Reference to a field of type 'frontend_event_logs_error_level[]'
   */
  export type ListEnumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'frontend_event_logs_error_level[]'>
    


  /**
   * Reference to a field of type 'spot_guides_voice_type'
   */
  export type Enumspot_guides_voice_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'spot_guides_voice_type'>
    


  /**
   * Reference to a field of type 'spot_guides_voice_type[]'
   */
  export type ListEnumspot_guides_voice_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'spot_guides_voice_type[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    
  /**
   * Deep Input Types
   */


  export type backend_event_logsWhereInput = {
    AND?: backend_event_logsWhereInput | backend_event_logsWhereInput[]
    OR?: backend_event_logsWhereInput[]
    NOT?: backend_event_logsWhereInput | backend_event_logsWhereInput[]
    id?: StringFilter<"backend_event_logs"> | string
    event_name?: StringNullableFilter<"backend_event_logs"> | string | null
    error_level?: Enumbackend_event_logs_error_levelNullableFilter<"backend_event_logs"> | $Enums.backend_event_logs_error_level | null
    function_name?: StringNullableFilter<"backend_event_logs"> | string | null
    user_id?: StringNullableFilter<"backend_event_logs"> | string | null
    payload?: JsonNullableFilter<"backend_event_logs">
    request_id?: StringNullableFilter<"backend_event_logs"> | string | null
    created_at?: DateTimeFilter<"backend_event_logs"> | Date | string
    created_commit_id?: StringFilter<"backend_event_logs"> | string
  }

  export type backend_event_logsOrderByWithRelationInput = {
    id?: SortOrder
    event_name?: SortOrderInput | SortOrder
    error_level?: SortOrderInput | SortOrder
    function_name?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    payload?: SortOrderInput | SortOrder
    request_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    created_commit_id?: SortOrder
  }

  export type backend_event_logsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: backend_event_logsWhereInput | backend_event_logsWhereInput[]
    OR?: backend_event_logsWhereInput[]
    NOT?: backend_event_logsWhereInput | backend_event_logsWhereInput[]
    event_name?: StringNullableFilter<"backend_event_logs"> | string | null
    error_level?: Enumbackend_event_logs_error_levelNullableFilter<"backend_event_logs"> | $Enums.backend_event_logs_error_level | null
    function_name?: StringNullableFilter<"backend_event_logs"> | string | null
    user_id?: StringNullableFilter<"backend_event_logs"> | string | null
    payload?: JsonNullableFilter<"backend_event_logs">
    request_id?: StringNullableFilter<"backend_event_logs"> | string | null
    created_at?: DateTimeFilter<"backend_event_logs"> | Date | string
    created_commit_id?: StringFilter<"backend_event_logs"> | string
  }, "id">

  export type backend_event_logsOrderByWithAggregationInput = {
    id?: SortOrder
    event_name?: SortOrderInput | SortOrder
    error_level?: SortOrderInput | SortOrder
    function_name?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    payload?: SortOrderInput | SortOrder
    request_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    created_commit_id?: SortOrder
    _count?: backend_event_logsCountOrderByAggregateInput
    _max?: backend_event_logsMaxOrderByAggregateInput
    _min?: backend_event_logsMinOrderByAggregateInput
  }

  export type backend_event_logsScalarWhereWithAggregatesInput = {
    AND?: backend_event_logsScalarWhereWithAggregatesInput | backend_event_logsScalarWhereWithAggregatesInput[]
    OR?: backend_event_logsScalarWhereWithAggregatesInput[]
    NOT?: backend_event_logsScalarWhereWithAggregatesInput | backend_event_logsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"backend_event_logs"> | string
    event_name?: StringNullableWithAggregatesFilter<"backend_event_logs"> | string | null
    error_level?: Enumbackend_event_logs_error_levelNullableWithAggregatesFilter<"backend_event_logs"> | $Enums.backend_event_logs_error_level | null
    function_name?: StringNullableWithAggregatesFilter<"backend_event_logs"> | string | null
    user_id?: StringNullableWithAggregatesFilter<"backend_event_logs"> | string | null
    payload?: JsonNullableWithAggregatesFilter<"backend_event_logs">
    request_id?: StringNullableWithAggregatesFilter<"backend_event_logs"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"backend_event_logs"> | Date | string
    created_commit_id?: StringWithAggregatesFilter<"backend_event_logs"> | string
  }

  export type ext_spotsWhereInput = {
    AND?: ext_spotsWhereInput | ext_spotsWhereInput[]
    OR?: ext_spotsWhereInput[]
    NOT?: ext_spotsWhereInput | ext_spotsWhereInput[]
    id?: StringFilter<"ext_spots"> | string
    source_type?: Enumext_spots_source_typeFilter<"ext_spots"> | $Enums.ext_spots_source_type
    title?: StringFilter<"ext_spots"> | string
    image_url?: StringFilter<"ext_spots"> | string
    landmark_latitude?: FloatFilter<"ext_spots"> | number
    landmark_longitude?: FloatFilter<"ext_spots"> | number
    is_recommendable?: BoolFilter<"ext_spots"> | boolean
    created_at?: DateTimeFilter<"ext_spots"> | Date | string
    lock_no?: IntFilter<"ext_spots"> | number
    spot_guides?: Spot_guidesListRelationFilter
    spot_visits_spot_visits_prev_spot_idToext_spots?: Spot_visitsListRelationFilter
    spot_visits_spot_visits_spot_idToext_spots?: Spot_visitsListRelationFilter
  }

  export type ext_spotsOrderByWithRelationInput = {
    id?: SortOrder
    source_type?: SortOrder
    title?: SortOrder
    image_url?: SortOrder
    landmark_latitude?: SortOrder
    landmark_longitude?: SortOrder
    is_recommendable?: SortOrder
    created_at?: SortOrder
    lock_no?: SortOrder
    spot_guides?: spot_guidesOrderByRelationAggregateInput
    spot_visits_spot_visits_prev_spot_idToext_spots?: spot_visitsOrderByRelationAggregateInput
    spot_visits_spot_visits_spot_idToext_spots?: spot_visitsOrderByRelationAggregateInput
  }

  export type ext_spotsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ext_spotsWhereInput | ext_spotsWhereInput[]
    OR?: ext_spotsWhereInput[]
    NOT?: ext_spotsWhereInput | ext_spotsWhereInput[]
    source_type?: Enumext_spots_source_typeFilter<"ext_spots"> | $Enums.ext_spots_source_type
    title?: StringFilter<"ext_spots"> | string
    image_url?: StringFilter<"ext_spots"> | string
    landmark_latitude?: FloatFilter<"ext_spots"> | number
    landmark_longitude?: FloatFilter<"ext_spots"> | number
    is_recommendable?: BoolFilter<"ext_spots"> | boolean
    created_at?: DateTimeFilter<"ext_spots"> | Date | string
    lock_no?: IntFilter<"ext_spots"> | number
    spot_guides?: Spot_guidesListRelationFilter
    spot_visits_spot_visits_prev_spot_idToext_spots?: Spot_visitsListRelationFilter
    spot_visits_spot_visits_spot_idToext_spots?: Spot_visitsListRelationFilter
  }, "id">

  export type ext_spotsOrderByWithAggregationInput = {
    id?: SortOrder
    source_type?: SortOrder
    title?: SortOrder
    image_url?: SortOrder
    landmark_latitude?: SortOrder
    landmark_longitude?: SortOrder
    is_recommendable?: SortOrder
    created_at?: SortOrder
    lock_no?: SortOrder
    _count?: ext_spotsCountOrderByAggregateInput
    _avg?: ext_spotsAvgOrderByAggregateInput
    _max?: ext_spotsMaxOrderByAggregateInput
    _min?: ext_spotsMinOrderByAggregateInput
    _sum?: ext_spotsSumOrderByAggregateInput
  }

  export type ext_spotsScalarWhereWithAggregatesInput = {
    AND?: ext_spotsScalarWhereWithAggregatesInput | ext_spotsScalarWhereWithAggregatesInput[]
    OR?: ext_spotsScalarWhereWithAggregatesInput[]
    NOT?: ext_spotsScalarWhereWithAggregatesInput | ext_spotsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ext_spots"> | string
    source_type?: Enumext_spots_source_typeWithAggregatesFilter<"ext_spots"> | $Enums.ext_spots_source_type
    title?: StringWithAggregatesFilter<"ext_spots"> | string
    image_url?: StringWithAggregatesFilter<"ext_spots"> | string
    landmark_latitude?: FloatWithAggregatesFilter<"ext_spots"> | number
    landmark_longitude?: FloatWithAggregatesFilter<"ext_spots"> | number
    is_recommendable?: BoolWithAggregatesFilter<"ext_spots"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"ext_spots"> | Date | string
    lock_no?: IntWithAggregatesFilter<"ext_spots"> | number
  }

  export type external_api_logsWhereInput = {
    AND?: external_api_logsWhereInput | external_api_logsWhereInput[]
    OR?: external_api_logsWhereInput[]
    NOT?: external_api_logsWhereInput | external_api_logsWhereInput[]
    id?: StringFilter<"external_api_logs"> | string
    request_id?: StringNullableFilter<"external_api_logs"> | string | null
    function_name?: StringNullableFilter<"external_api_logs"> | string | null
    api_name?: StringNullableFilter<"external_api_logs"> | string | null
    endpoint?: StringNullableFilter<"external_api_logs"> | string | null
    request_payload?: JsonNullableFilter<"external_api_logs">
    response_payload?: JsonNullableFilter<"external_api_logs">
    status_code?: IntNullableFilter<"external_api_logs"> | number | null
    error_message?: StringNullableFilter<"external_api_logs"> | string | null
    response_time_ms?: IntNullableFilter<"external_api_logs"> | number | null
    user_id?: StringNullableFilter<"external_api_logs"> | string | null
    created_at?: DateTimeFilter<"external_api_logs"> | Date | string
    created_commit_id?: StringFilter<"external_api_logs"> | string
  }

  export type external_api_logsOrderByWithRelationInput = {
    id?: SortOrder
    request_id?: SortOrderInput | SortOrder
    function_name?: SortOrderInput | SortOrder
    api_name?: SortOrderInput | SortOrder
    endpoint?: SortOrderInput | SortOrder
    request_payload?: SortOrderInput | SortOrder
    response_payload?: SortOrderInput | SortOrder
    status_code?: SortOrderInput | SortOrder
    error_message?: SortOrderInput | SortOrder
    response_time_ms?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    created_commit_id?: SortOrder
  }

  export type external_api_logsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: external_api_logsWhereInput | external_api_logsWhereInput[]
    OR?: external_api_logsWhereInput[]
    NOT?: external_api_logsWhereInput | external_api_logsWhereInput[]
    request_id?: StringNullableFilter<"external_api_logs"> | string | null
    function_name?: StringNullableFilter<"external_api_logs"> | string | null
    api_name?: StringNullableFilter<"external_api_logs"> | string | null
    endpoint?: StringNullableFilter<"external_api_logs"> | string | null
    request_payload?: JsonNullableFilter<"external_api_logs">
    response_payload?: JsonNullableFilter<"external_api_logs">
    status_code?: IntNullableFilter<"external_api_logs"> | number | null
    error_message?: StringNullableFilter<"external_api_logs"> | string | null
    response_time_ms?: IntNullableFilter<"external_api_logs"> | number | null
    user_id?: StringNullableFilter<"external_api_logs"> | string | null
    created_at?: DateTimeFilter<"external_api_logs"> | Date | string
    created_commit_id?: StringFilter<"external_api_logs"> | string
  }, "id">

  export type external_api_logsOrderByWithAggregationInput = {
    id?: SortOrder
    request_id?: SortOrderInput | SortOrder
    function_name?: SortOrderInput | SortOrder
    api_name?: SortOrderInput | SortOrder
    endpoint?: SortOrderInput | SortOrder
    request_payload?: SortOrderInput | SortOrder
    response_payload?: SortOrderInput | SortOrder
    status_code?: SortOrderInput | SortOrder
    error_message?: SortOrderInput | SortOrder
    response_time_ms?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    created_commit_id?: SortOrder
    _count?: external_api_logsCountOrderByAggregateInput
    _avg?: external_api_logsAvgOrderByAggregateInput
    _max?: external_api_logsMaxOrderByAggregateInput
    _min?: external_api_logsMinOrderByAggregateInput
    _sum?: external_api_logsSumOrderByAggregateInput
  }

  export type external_api_logsScalarWhereWithAggregatesInput = {
    AND?: external_api_logsScalarWhereWithAggregatesInput | external_api_logsScalarWhereWithAggregatesInput[]
    OR?: external_api_logsScalarWhereWithAggregatesInput[]
    NOT?: external_api_logsScalarWhereWithAggregatesInput | external_api_logsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"external_api_logs"> | string
    request_id?: StringNullableWithAggregatesFilter<"external_api_logs"> | string | null
    function_name?: StringNullableWithAggregatesFilter<"external_api_logs"> | string | null
    api_name?: StringNullableWithAggregatesFilter<"external_api_logs"> | string | null
    endpoint?: StringNullableWithAggregatesFilter<"external_api_logs"> | string | null
    request_payload?: JsonNullableWithAggregatesFilter<"external_api_logs">
    response_payload?: JsonNullableWithAggregatesFilter<"external_api_logs">
    status_code?: IntNullableWithAggregatesFilter<"external_api_logs"> | number | null
    error_message?: StringNullableWithAggregatesFilter<"external_api_logs"> | string | null
    response_time_ms?: IntNullableWithAggregatesFilter<"external_api_logs"> | number | null
    user_id?: StringNullableWithAggregatesFilter<"external_api_logs"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"external_api_logs"> | Date | string
    created_commit_id?: StringWithAggregatesFilter<"external_api_logs"> | string
  }

  export type frontend_event_logsWhereInput = {
    AND?: frontend_event_logsWhereInput | frontend_event_logsWhereInput[]
    OR?: frontend_event_logsWhereInput[]
    NOT?: frontend_event_logsWhereInput | frontend_event_logsWhereInput[]
    id?: StringFilter<"frontend_event_logs"> | string
    user_id?: StringNullableFilter<"frontend_event_logs"> | string | null
    event_name?: StringNullableFilter<"frontend_event_logs"> | string | null
    error_level?: Enumfrontend_event_logs_error_levelNullableFilter<"frontend_event_logs"> | $Enums.frontend_event_logs_error_level | null
    screen_name?: StringNullableFilter<"frontend_event_logs"> | string | null
    payload?: StringNullableFilter<"frontend_event_logs"> | string | null
    created_at?: DateTimeFilter<"frontend_event_logs"> | Date | string
    created_app_version?: StringFilter<"frontend_event_logs"> | string
    created_commit_id?: StringFilter<"frontend_event_logs"> | string
  }

  export type frontend_event_logsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    event_name?: SortOrderInput | SortOrder
    error_level?: SortOrderInput | SortOrder
    screen_name?: SortOrderInput | SortOrder
    payload?: SortOrderInput | SortOrder
    created_at?: SortOrder
    created_app_version?: SortOrder
    created_commit_id?: SortOrder
  }

  export type frontend_event_logsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: frontend_event_logsWhereInput | frontend_event_logsWhereInput[]
    OR?: frontend_event_logsWhereInput[]
    NOT?: frontend_event_logsWhereInput | frontend_event_logsWhereInput[]
    user_id?: StringNullableFilter<"frontend_event_logs"> | string | null
    event_name?: StringNullableFilter<"frontend_event_logs"> | string | null
    error_level?: Enumfrontend_event_logs_error_levelNullableFilter<"frontend_event_logs"> | $Enums.frontend_event_logs_error_level | null
    screen_name?: StringNullableFilter<"frontend_event_logs"> | string | null
    payload?: StringNullableFilter<"frontend_event_logs"> | string | null
    created_at?: DateTimeFilter<"frontend_event_logs"> | Date | string
    created_app_version?: StringFilter<"frontend_event_logs"> | string
    created_commit_id?: StringFilter<"frontend_event_logs"> | string
  }, "id">

  export type frontend_event_logsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    event_name?: SortOrderInput | SortOrder
    error_level?: SortOrderInput | SortOrder
    screen_name?: SortOrderInput | SortOrder
    payload?: SortOrderInput | SortOrder
    created_at?: SortOrder
    created_app_version?: SortOrder
    created_commit_id?: SortOrder
    _count?: frontend_event_logsCountOrderByAggregateInput
    _max?: frontend_event_logsMaxOrderByAggregateInput
    _min?: frontend_event_logsMinOrderByAggregateInput
  }

  export type frontend_event_logsScalarWhereWithAggregatesInput = {
    AND?: frontend_event_logsScalarWhereWithAggregatesInput | frontend_event_logsScalarWhereWithAggregatesInput[]
    OR?: frontend_event_logsScalarWhereWithAggregatesInput[]
    NOT?: frontend_event_logsScalarWhereWithAggregatesInput | frontend_event_logsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"frontend_event_logs"> | string
    user_id?: StringNullableWithAggregatesFilter<"frontend_event_logs"> | string | null
    event_name?: StringNullableWithAggregatesFilter<"frontend_event_logs"> | string | null
    error_level?: Enumfrontend_event_logs_error_levelNullableWithAggregatesFilter<"frontend_event_logs"> | $Enums.frontend_event_logs_error_level | null
    screen_name?: StringNullableWithAggregatesFilter<"frontend_event_logs"> | string | null
    payload?: StringNullableWithAggregatesFilter<"frontend_event_logs"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"frontend_event_logs"> | Date | string
    created_app_version?: StringWithAggregatesFilter<"frontend_event_logs"> | string
    created_commit_id?: StringWithAggregatesFilter<"frontend_event_logs"> | string
  }

  export type spot_guidesWhereInput = {
    AND?: spot_guidesWhereInput | spot_guidesWhereInput[]
    OR?: spot_guidesWhereInput[]
    NOT?: spot_guidesWhereInput | spot_guidesWhereInput[]
    id?: StringFilter<"spot_guides"> | string
    spot_id?: StringFilter<"spot_guides"> | string
    lang?: StringFilter<"spot_guides"> | string
    title?: StringFilter<"spot_guides"> | string
    manuscript?: StringFilter<"spot_guides"> | string
    audio_storage_path?: StringFilter<"spot_guides"> | string
    voice_type?: Enumspot_guides_voice_typeFilter<"spot_guides"> | $Enums.spot_guides_voice_type
    tags?: StringNullableListFilter<"spot_guides">
    price_amount?: DecimalFilter<"spot_guides"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"spot_guides"> | string
    recommendation_weight?: IntFilter<"spot_guides"> | number
    min_version_major?: IntFilter<"spot_guides"> | number
    max_version_major?: IntFilter<"spot_guides"> | number
    created_by?: StringFilter<"spot_guides"> | string
    created_at?: DateTimeFilter<"spot_guides"> | Date | string
    created_request_id?: StringFilter<"spot_guides"> | string
    lock_no?: IntFilter<"spot_guides"> | number
    ext_spots?: XOR<Ext_spotsScalarRelationFilter, ext_spotsWhereInput>
    spot_visits?: Spot_visitsListRelationFilter
  }

  export type spot_guidesOrderByWithRelationInput = {
    id?: SortOrder
    spot_id?: SortOrder
    lang?: SortOrder
    title?: SortOrder
    manuscript?: SortOrder
    audio_storage_path?: SortOrder
    voice_type?: SortOrder
    tags?: SortOrder
    price_amount?: SortOrder
    currency?: SortOrder
    recommendation_weight?: SortOrder
    min_version_major?: SortOrder
    max_version_major?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    created_request_id?: SortOrder
    lock_no?: SortOrder
    ext_spots?: ext_spotsOrderByWithRelationInput
    spot_visits?: spot_visitsOrderByRelationAggregateInput
  }

  export type spot_guidesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: spot_guidesWhereInput | spot_guidesWhereInput[]
    OR?: spot_guidesWhereInput[]
    NOT?: spot_guidesWhereInput | spot_guidesWhereInput[]
    spot_id?: StringFilter<"spot_guides"> | string
    lang?: StringFilter<"spot_guides"> | string
    title?: StringFilter<"spot_guides"> | string
    manuscript?: StringFilter<"spot_guides"> | string
    audio_storage_path?: StringFilter<"spot_guides"> | string
    voice_type?: Enumspot_guides_voice_typeFilter<"spot_guides"> | $Enums.spot_guides_voice_type
    tags?: StringNullableListFilter<"spot_guides">
    price_amount?: DecimalFilter<"spot_guides"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"spot_guides"> | string
    recommendation_weight?: IntFilter<"spot_guides"> | number
    min_version_major?: IntFilter<"spot_guides"> | number
    max_version_major?: IntFilter<"spot_guides"> | number
    created_by?: StringFilter<"spot_guides"> | string
    created_at?: DateTimeFilter<"spot_guides"> | Date | string
    created_request_id?: StringFilter<"spot_guides"> | string
    lock_no?: IntFilter<"spot_guides"> | number
    ext_spots?: XOR<Ext_spotsScalarRelationFilter, ext_spotsWhereInput>
    spot_visits?: Spot_visitsListRelationFilter
  }, "id">

  export type spot_guidesOrderByWithAggregationInput = {
    id?: SortOrder
    spot_id?: SortOrder
    lang?: SortOrder
    title?: SortOrder
    manuscript?: SortOrder
    audio_storage_path?: SortOrder
    voice_type?: SortOrder
    tags?: SortOrder
    price_amount?: SortOrder
    currency?: SortOrder
    recommendation_weight?: SortOrder
    min_version_major?: SortOrder
    max_version_major?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    created_request_id?: SortOrder
    lock_no?: SortOrder
    _count?: spot_guidesCountOrderByAggregateInput
    _avg?: spot_guidesAvgOrderByAggregateInput
    _max?: spot_guidesMaxOrderByAggregateInput
    _min?: spot_guidesMinOrderByAggregateInput
    _sum?: spot_guidesSumOrderByAggregateInput
  }

  export type spot_guidesScalarWhereWithAggregatesInput = {
    AND?: spot_guidesScalarWhereWithAggregatesInput | spot_guidesScalarWhereWithAggregatesInput[]
    OR?: spot_guidesScalarWhereWithAggregatesInput[]
    NOT?: spot_guidesScalarWhereWithAggregatesInput | spot_guidesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"spot_guides"> | string
    spot_id?: StringWithAggregatesFilter<"spot_guides"> | string
    lang?: StringWithAggregatesFilter<"spot_guides"> | string
    title?: StringWithAggregatesFilter<"spot_guides"> | string
    manuscript?: StringWithAggregatesFilter<"spot_guides"> | string
    audio_storage_path?: StringWithAggregatesFilter<"spot_guides"> | string
    voice_type?: Enumspot_guides_voice_typeWithAggregatesFilter<"spot_guides"> | $Enums.spot_guides_voice_type
    tags?: StringNullableListFilter<"spot_guides">
    price_amount?: DecimalWithAggregatesFilter<"spot_guides"> | Decimal | DecimalJsLike | number | string
    currency?: StringWithAggregatesFilter<"spot_guides"> | string
    recommendation_weight?: IntWithAggregatesFilter<"spot_guides"> | number
    min_version_major?: IntWithAggregatesFilter<"spot_guides"> | number
    max_version_major?: IntWithAggregatesFilter<"spot_guides"> | number
    created_by?: StringWithAggregatesFilter<"spot_guides"> | string
    created_at?: DateTimeWithAggregatesFilter<"spot_guides"> | Date | string
    created_request_id?: StringWithAggregatesFilter<"spot_guides"> | string
    lock_no?: IntWithAggregatesFilter<"spot_guides"> | number
  }

  export type spot_visitsWhereInput = {
    AND?: spot_visitsWhereInput | spot_visitsWhereInput[]
    OR?: spot_visitsWhereInput[]
    NOT?: spot_visitsWhereInput | spot_visitsWhereInput[]
    id?: StringFilter<"spot_visits"> | string
    user_id?: StringFilter<"spot_visits"> | string
    spot_id?: StringFilter<"spot_visits"> | string
    represent_guide_id?: StringFilter<"spot_visits"> | string
    taken_photo_storage_path?: StringNullableFilter<"spot_visits"> | string | null
    prev_spot_id?: StringNullableFilter<"spot_visits"> | string | null
    time_gap_minutes?: IntFilter<"spot_visits"> | number
    min_version_major?: IntFilter<"spot_visits"> | number
    max_version_major?: IntFilter<"spot_visits"> | number
    created_at?: DateTimeFilter<"spot_visits"> | Date | string
    updated_at?: DateTimeFilter<"spot_visits"> | Date | string
    lock_no?: IntFilter<"spot_visits"> | number
    ext_spots_spot_visits_prev_spot_idToext_spots?: XOR<Ext_spotsNullableScalarRelationFilter, ext_spotsWhereInput> | null
    spot_guides?: XOR<Spot_guidesScalarRelationFilter, spot_guidesWhereInput>
    ext_spots_spot_visits_spot_idToext_spots?: XOR<Ext_spotsScalarRelationFilter, ext_spotsWhereInput>
  }

  export type spot_visitsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    spot_id?: SortOrder
    represent_guide_id?: SortOrder
    taken_photo_storage_path?: SortOrderInput | SortOrder
    prev_spot_id?: SortOrderInput | SortOrder
    time_gap_minutes?: SortOrder
    min_version_major?: SortOrder
    max_version_major?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    lock_no?: SortOrder
    ext_spots_spot_visits_prev_spot_idToext_spots?: ext_spotsOrderByWithRelationInput
    spot_guides?: spot_guidesOrderByWithRelationInput
    ext_spots_spot_visits_spot_idToext_spots?: ext_spotsOrderByWithRelationInput
  }

  export type spot_visitsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: spot_visitsWhereInput | spot_visitsWhereInput[]
    OR?: spot_visitsWhereInput[]
    NOT?: spot_visitsWhereInput | spot_visitsWhereInput[]
    user_id?: StringFilter<"spot_visits"> | string
    spot_id?: StringFilter<"spot_visits"> | string
    represent_guide_id?: StringFilter<"spot_visits"> | string
    taken_photo_storage_path?: StringNullableFilter<"spot_visits"> | string | null
    prev_spot_id?: StringNullableFilter<"spot_visits"> | string | null
    time_gap_minutes?: IntFilter<"spot_visits"> | number
    min_version_major?: IntFilter<"spot_visits"> | number
    max_version_major?: IntFilter<"spot_visits"> | number
    created_at?: DateTimeFilter<"spot_visits"> | Date | string
    updated_at?: DateTimeFilter<"spot_visits"> | Date | string
    lock_no?: IntFilter<"spot_visits"> | number
    ext_spots_spot_visits_prev_spot_idToext_spots?: XOR<Ext_spotsNullableScalarRelationFilter, ext_spotsWhereInput> | null
    spot_guides?: XOR<Spot_guidesScalarRelationFilter, spot_guidesWhereInput>
    ext_spots_spot_visits_spot_idToext_spots?: XOR<Ext_spotsScalarRelationFilter, ext_spotsWhereInput>
  }, "id">

  export type spot_visitsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    spot_id?: SortOrder
    represent_guide_id?: SortOrder
    taken_photo_storage_path?: SortOrderInput | SortOrder
    prev_spot_id?: SortOrderInput | SortOrder
    time_gap_minutes?: SortOrder
    min_version_major?: SortOrder
    max_version_major?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    lock_no?: SortOrder
    _count?: spot_visitsCountOrderByAggregateInput
    _avg?: spot_visitsAvgOrderByAggregateInput
    _max?: spot_visitsMaxOrderByAggregateInput
    _min?: spot_visitsMinOrderByAggregateInput
    _sum?: spot_visitsSumOrderByAggregateInput
  }

  export type spot_visitsScalarWhereWithAggregatesInput = {
    AND?: spot_visitsScalarWhereWithAggregatesInput | spot_visitsScalarWhereWithAggregatesInput[]
    OR?: spot_visitsScalarWhereWithAggregatesInput[]
    NOT?: spot_visitsScalarWhereWithAggregatesInput | spot_visitsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"spot_visits"> | string
    user_id?: StringWithAggregatesFilter<"spot_visits"> | string
    spot_id?: StringWithAggregatesFilter<"spot_visits"> | string
    represent_guide_id?: StringWithAggregatesFilter<"spot_visits"> | string
    taken_photo_storage_path?: StringNullableWithAggregatesFilter<"spot_visits"> | string | null
    prev_spot_id?: StringNullableWithAggregatesFilter<"spot_visits"> | string | null
    time_gap_minutes?: IntWithAggregatesFilter<"spot_visits"> | number
    min_version_major?: IntWithAggregatesFilter<"spot_visits"> | number
    max_version_major?: IntWithAggregatesFilter<"spot_visits"> | number
    created_at?: DateTimeWithAggregatesFilter<"spot_visits"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"spot_visits"> | Date | string
    lock_no?: IntWithAggregatesFilter<"spot_visits"> | number
  }

  export type backend_event_logsCreateInput = {
    id: string
    event_name?: string | null
    error_level?: $Enums.backend_event_logs_error_level | null
    function_name?: string | null
    user_id?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    request_id?: string | null
    created_at?: Date | string
    created_commit_id: string
  }

  export type backend_event_logsUncheckedCreateInput = {
    id: string
    event_name?: string | null
    error_level?: $Enums.backend_event_logs_error_level | null
    function_name?: string | null
    user_id?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    request_id?: string | null
    created_at?: Date | string
    created_commit_id: string
  }

  export type backend_event_logsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_name?: NullableStringFieldUpdateOperationsInput | string | null
    error_level?: NullableEnumbackend_event_logs_error_levelFieldUpdateOperationsInput | $Enums.backend_event_logs_error_level | null
    function_name?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    request_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type backend_event_logsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_name?: NullableStringFieldUpdateOperationsInput | string | null
    error_level?: NullableEnumbackend_event_logs_error_levelFieldUpdateOperationsInput | $Enums.backend_event_logs_error_level | null
    function_name?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    request_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type backend_event_logsCreateManyInput = {
    id: string
    event_name?: string | null
    error_level?: $Enums.backend_event_logs_error_level | null
    function_name?: string | null
    user_id?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    request_id?: string | null
    created_at?: Date | string
    created_commit_id: string
  }

  export type backend_event_logsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_name?: NullableStringFieldUpdateOperationsInput | string | null
    error_level?: NullableEnumbackend_event_logs_error_levelFieldUpdateOperationsInput | $Enums.backend_event_logs_error_level | null
    function_name?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    request_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type backend_event_logsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_name?: NullableStringFieldUpdateOperationsInput | string | null
    error_level?: NullableEnumbackend_event_logs_error_levelFieldUpdateOperationsInput | $Enums.backend_event_logs_error_level | null
    function_name?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    request_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type ext_spotsCreateInput = {
    id: string
    source_type: $Enums.ext_spots_source_type
    title: string
    image_url: string
    landmark_latitude: number
    landmark_longitude: number
    is_recommendable: boolean
    created_at?: Date | string
    lock_no?: number
    spot_guides?: spot_guidesCreateNestedManyWithoutExt_spotsInput
    spot_visits_spot_visits_prev_spot_idToext_spots?: spot_visitsCreateNestedManyWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput
    spot_visits_spot_visits_spot_idToext_spots?: spot_visitsCreateNestedManyWithoutExt_spots_spot_visits_spot_idToext_spotsInput
  }

  export type ext_spotsUncheckedCreateInput = {
    id: string
    source_type: $Enums.ext_spots_source_type
    title: string
    image_url: string
    landmark_latitude: number
    landmark_longitude: number
    is_recommendable: boolean
    created_at?: Date | string
    lock_no?: number
    spot_guides?: spot_guidesUncheckedCreateNestedManyWithoutExt_spotsInput
    spot_visits_spot_visits_prev_spot_idToext_spots?: spot_visitsUncheckedCreateNestedManyWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput
    spot_visits_spot_visits_spot_idToext_spots?: spot_visitsUncheckedCreateNestedManyWithoutExt_spots_spot_visits_spot_idToext_spotsInput
  }

  export type ext_spotsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    source_type?: Enumext_spots_source_typeFieldUpdateOperationsInput | $Enums.ext_spots_source_type
    title?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    landmark_latitude?: FloatFieldUpdateOperationsInput | number
    landmark_longitude?: FloatFieldUpdateOperationsInput | number
    is_recommendable?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
    spot_guides?: spot_guidesUpdateManyWithoutExt_spotsNestedInput
    spot_visits_spot_visits_prev_spot_idToext_spots?: spot_visitsUpdateManyWithoutExt_spots_spot_visits_prev_spot_idToext_spotsNestedInput
    spot_visits_spot_visits_spot_idToext_spots?: spot_visitsUpdateManyWithoutExt_spots_spot_visits_spot_idToext_spotsNestedInput
  }

  export type ext_spotsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    source_type?: Enumext_spots_source_typeFieldUpdateOperationsInput | $Enums.ext_spots_source_type
    title?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    landmark_latitude?: FloatFieldUpdateOperationsInput | number
    landmark_longitude?: FloatFieldUpdateOperationsInput | number
    is_recommendable?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
    spot_guides?: spot_guidesUncheckedUpdateManyWithoutExt_spotsNestedInput
    spot_visits_spot_visits_prev_spot_idToext_spots?: spot_visitsUncheckedUpdateManyWithoutExt_spots_spot_visits_prev_spot_idToext_spotsNestedInput
    spot_visits_spot_visits_spot_idToext_spots?: spot_visitsUncheckedUpdateManyWithoutExt_spots_spot_visits_spot_idToext_spotsNestedInput
  }

  export type ext_spotsCreateManyInput = {
    id: string
    source_type: $Enums.ext_spots_source_type
    title: string
    image_url: string
    landmark_latitude: number
    landmark_longitude: number
    is_recommendable: boolean
    created_at?: Date | string
    lock_no?: number
  }

  export type ext_spotsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    source_type?: Enumext_spots_source_typeFieldUpdateOperationsInput | $Enums.ext_spots_source_type
    title?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    landmark_latitude?: FloatFieldUpdateOperationsInput | number
    landmark_longitude?: FloatFieldUpdateOperationsInput | number
    is_recommendable?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
  }

  export type ext_spotsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    source_type?: Enumext_spots_source_typeFieldUpdateOperationsInput | $Enums.ext_spots_source_type
    title?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    landmark_latitude?: FloatFieldUpdateOperationsInput | number
    landmark_longitude?: FloatFieldUpdateOperationsInput | number
    is_recommendable?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
  }

  export type external_api_logsCreateInput = {
    id: string
    request_id?: string | null
    function_name?: string | null
    api_name?: string | null
    endpoint?: string | null
    request_payload?: NullableJsonNullValueInput | InputJsonValue
    response_payload?: NullableJsonNullValueInput | InputJsonValue
    status_code?: number | null
    error_message?: string | null
    response_time_ms?: number | null
    user_id?: string | null
    created_at?: Date | string
    created_commit_id: string
  }

  export type external_api_logsUncheckedCreateInput = {
    id: string
    request_id?: string | null
    function_name?: string | null
    api_name?: string | null
    endpoint?: string | null
    request_payload?: NullableJsonNullValueInput | InputJsonValue
    response_payload?: NullableJsonNullValueInput | InputJsonValue
    status_code?: number | null
    error_message?: string | null
    response_time_ms?: number | null
    user_id?: string | null
    created_at?: Date | string
    created_commit_id: string
  }

  export type external_api_logsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    request_id?: NullableStringFieldUpdateOperationsInput | string | null
    function_name?: NullableStringFieldUpdateOperationsInput | string | null
    api_name?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: NullableStringFieldUpdateOperationsInput | string | null
    request_payload?: NullableJsonNullValueInput | InputJsonValue
    response_payload?: NullableJsonNullValueInput | InputJsonValue
    status_code?: NullableIntFieldUpdateOperationsInput | number | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    response_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type external_api_logsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    request_id?: NullableStringFieldUpdateOperationsInput | string | null
    function_name?: NullableStringFieldUpdateOperationsInput | string | null
    api_name?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: NullableStringFieldUpdateOperationsInput | string | null
    request_payload?: NullableJsonNullValueInput | InputJsonValue
    response_payload?: NullableJsonNullValueInput | InputJsonValue
    status_code?: NullableIntFieldUpdateOperationsInput | number | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    response_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type external_api_logsCreateManyInput = {
    id: string
    request_id?: string | null
    function_name?: string | null
    api_name?: string | null
    endpoint?: string | null
    request_payload?: NullableJsonNullValueInput | InputJsonValue
    response_payload?: NullableJsonNullValueInput | InputJsonValue
    status_code?: number | null
    error_message?: string | null
    response_time_ms?: number | null
    user_id?: string | null
    created_at?: Date | string
    created_commit_id: string
  }

  export type external_api_logsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    request_id?: NullableStringFieldUpdateOperationsInput | string | null
    function_name?: NullableStringFieldUpdateOperationsInput | string | null
    api_name?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: NullableStringFieldUpdateOperationsInput | string | null
    request_payload?: NullableJsonNullValueInput | InputJsonValue
    response_payload?: NullableJsonNullValueInput | InputJsonValue
    status_code?: NullableIntFieldUpdateOperationsInput | number | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    response_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type external_api_logsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    request_id?: NullableStringFieldUpdateOperationsInput | string | null
    function_name?: NullableStringFieldUpdateOperationsInput | string | null
    api_name?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: NullableStringFieldUpdateOperationsInput | string | null
    request_payload?: NullableJsonNullValueInput | InputJsonValue
    response_payload?: NullableJsonNullValueInput | InputJsonValue
    status_code?: NullableIntFieldUpdateOperationsInput | number | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    response_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type frontend_event_logsCreateInput = {
    id: string
    user_id?: string | null
    event_name?: string | null
    error_level?: $Enums.frontend_event_logs_error_level | null
    screen_name?: string | null
    payload?: string | null
    created_at?: Date | string
    created_app_version: string
    created_commit_id: string
  }

  export type frontend_event_logsUncheckedCreateInput = {
    id: string
    user_id?: string | null
    event_name?: string | null
    error_level?: $Enums.frontend_event_logs_error_level | null
    screen_name?: string | null
    payload?: string | null
    created_at?: Date | string
    created_app_version: string
    created_commit_id: string
  }

  export type frontend_event_logsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    event_name?: NullableStringFieldUpdateOperationsInput | string | null
    error_level?: NullableEnumfrontend_event_logs_error_levelFieldUpdateOperationsInput | $Enums.frontend_event_logs_error_level | null
    screen_name?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_app_version?: StringFieldUpdateOperationsInput | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type frontend_event_logsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    event_name?: NullableStringFieldUpdateOperationsInput | string | null
    error_level?: NullableEnumfrontend_event_logs_error_levelFieldUpdateOperationsInput | $Enums.frontend_event_logs_error_level | null
    screen_name?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_app_version?: StringFieldUpdateOperationsInput | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type frontend_event_logsCreateManyInput = {
    id: string
    user_id?: string | null
    event_name?: string | null
    error_level?: $Enums.frontend_event_logs_error_level | null
    screen_name?: string | null
    payload?: string | null
    created_at?: Date | string
    created_app_version: string
    created_commit_id: string
  }

  export type frontend_event_logsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    event_name?: NullableStringFieldUpdateOperationsInput | string | null
    error_level?: NullableEnumfrontend_event_logs_error_levelFieldUpdateOperationsInput | $Enums.frontend_event_logs_error_level | null
    screen_name?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_app_version?: StringFieldUpdateOperationsInput | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type frontend_event_logsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    event_name?: NullableStringFieldUpdateOperationsInput | string | null
    error_level?: NullableEnumfrontend_event_logs_error_levelFieldUpdateOperationsInput | $Enums.frontend_event_logs_error_level | null
    screen_name?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_app_version?: StringFieldUpdateOperationsInput | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type spot_guidesCreateInput = {
    id: string
    lang: string
    title: string
    manuscript: string
    audio_storage_path: string
    voice_type: $Enums.spot_guides_voice_type
    tags?: spot_guidesCreatetagsInput | string[]
    price_amount: Decimal | DecimalJsLike | number | string
    currency: string
    recommendation_weight: number
    min_version_major: number
    max_version_major: number
    created_by: string
    created_at?: Date | string
    created_request_id: string
    lock_no?: number
    ext_spots: ext_spotsCreateNestedOneWithoutSpot_guidesInput
    spot_visits?: spot_visitsCreateNestedManyWithoutSpot_guidesInput
  }

  export type spot_guidesUncheckedCreateInput = {
    id: string
    spot_id: string
    lang: string
    title: string
    manuscript: string
    audio_storage_path: string
    voice_type: $Enums.spot_guides_voice_type
    tags?: spot_guidesCreatetagsInput | string[]
    price_amount: Decimal | DecimalJsLike | number | string
    currency: string
    recommendation_weight: number
    min_version_major: number
    max_version_major: number
    created_by: string
    created_at?: Date | string
    created_request_id: string
    lock_no?: number
    spot_visits?: spot_visitsUncheckedCreateNestedManyWithoutSpot_guidesInput
  }

  export type spot_guidesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lang?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    manuscript?: StringFieldUpdateOperationsInput | string
    audio_storage_path?: StringFieldUpdateOperationsInput | string
    voice_type?: Enumspot_guides_voice_typeFieldUpdateOperationsInput | $Enums.spot_guides_voice_type
    tags?: spot_guidesUpdatetagsInput | string[]
    price_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    recommendation_weight?: IntFieldUpdateOperationsInput | number
    min_version_major?: IntFieldUpdateOperationsInput | number
    max_version_major?: IntFieldUpdateOperationsInput | number
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_request_id?: StringFieldUpdateOperationsInput | string
    lock_no?: IntFieldUpdateOperationsInput | number
    ext_spots?: ext_spotsUpdateOneRequiredWithoutSpot_guidesNestedInput
    spot_visits?: spot_visitsUpdateManyWithoutSpot_guidesNestedInput
  }

  export type spot_guidesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    spot_id?: StringFieldUpdateOperationsInput | string
    lang?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    manuscript?: StringFieldUpdateOperationsInput | string
    audio_storage_path?: StringFieldUpdateOperationsInput | string
    voice_type?: Enumspot_guides_voice_typeFieldUpdateOperationsInput | $Enums.spot_guides_voice_type
    tags?: spot_guidesUpdatetagsInput | string[]
    price_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    recommendation_weight?: IntFieldUpdateOperationsInput | number
    min_version_major?: IntFieldUpdateOperationsInput | number
    max_version_major?: IntFieldUpdateOperationsInput | number
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_request_id?: StringFieldUpdateOperationsInput | string
    lock_no?: IntFieldUpdateOperationsInput | number
    spot_visits?: spot_visitsUncheckedUpdateManyWithoutSpot_guidesNestedInput
  }

  export type spot_guidesCreateManyInput = {
    id: string
    spot_id: string
    lang: string
    title: string
    manuscript: string
    audio_storage_path: string
    voice_type: $Enums.spot_guides_voice_type
    tags?: spot_guidesCreatetagsInput | string[]
    price_amount: Decimal | DecimalJsLike | number | string
    currency: string
    recommendation_weight: number
    min_version_major: number
    max_version_major: number
    created_by: string
    created_at?: Date | string
    created_request_id: string
    lock_no?: number
  }

  export type spot_guidesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    lang?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    manuscript?: StringFieldUpdateOperationsInput | string
    audio_storage_path?: StringFieldUpdateOperationsInput | string
    voice_type?: Enumspot_guides_voice_typeFieldUpdateOperationsInput | $Enums.spot_guides_voice_type
    tags?: spot_guidesUpdatetagsInput | string[]
    price_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    recommendation_weight?: IntFieldUpdateOperationsInput | number
    min_version_major?: IntFieldUpdateOperationsInput | number
    max_version_major?: IntFieldUpdateOperationsInput | number
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_request_id?: StringFieldUpdateOperationsInput | string
    lock_no?: IntFieldUpdateOperationsInput | number
  }

  export type spot_guidesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    spot_id?: StringFieldUpdateOperationsInput | string
    lang?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    manuscript?: StringFieldUpdateOperationsInput | string
    audio_storage_path?: StringFieldUpdateOperationsInput | string
    voice_type?: Enumspot_guides_voice_typeFieldUpdateOperationsInput | $Enums.spot_guides_voice_type
    tags?: spot_guidesUpdatetagsInput | string[]
    price_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    recommendation_weight?: IntFieldUpdateOperationsInput | number
    min_version_major?: IntFieldUpdateOperationsInput | number
    max_version_major?: IntFieldUpdateOperationsInput | number
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_request_id?: StringFieldUpdateOperationsInput | string
    lock_no?: IntFieldUpdateOperationsInput | number
  }

  export type spot_visitsCreateInput = {
    id: string
    user_id: string
    taken_photo_storage_path?: string | null
    time_gap_minutes: number
    min_version_major: number
    max_version_major: number
    created_at?: Date | string
    updated_at?: Date | string
    lock_no?: number
    ext_spots_spot_visits_prev_spot_idToext_spots?: ext_spotsCreateNestedOneWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput
    spot_guides: spot_guidesCreateNestedOneWithoutSpot_visitsInput
    ext_spots_spot_visits_spot_idToext_spots: ext_spotsCreateNestedOneWithoutSpot_visits_spot_visits_spot_idToext_spotsInput
  }

  export type spot_visitsUncheckedCreateInput = {
    id: string
    user_id: string
    spot_id: string
    represent_guide_id: string
    taken_photo_storage_path?: string | null
    prev_spot_id?: string | null
    time_gap_minutes: number
    min_version_major: number
    max_version_major: number
    created_at?: Date | string
    updated_at?: Date | string
    lock_no?: number
  }

  export type spot_visitsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    taken_photo_storage_path?: NullableStringFieldUpdateOperationsInput | string | null
    time_gap_minutes?: IntFieldUpdateOperationsInput | number
    min_version_major?: IntFieldUpdateOperationsInput | number
    max_version_major?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
    ext_spots_spot_visits_prev_spot_idToext_spots?: ext_spotsUpdateOneWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsNestedInput
    spot_guides?: spot_guidesUpdateOneRequiredWithoutSpot_visitsNestedInput
    ext_spots_spot_visits_spot_idToext_spots?: ext_spotsUpdateOneRequiredWithoutSpot_visits_spot_visits_spot_idToext_spotsNestedInput
  }

  export type spot_visitsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    spot_id?: StringFieldUpdateOperationsInput | string
    represent_guide_id?: StringFieldUpdateOperationsInput | string
    taken_photo_storage_path?: NullableStringFieldUpdateOperationsInput | string | null
    prev_spot_id?: NullableStringFieldUpdateOperationsInput | string | null
    time_gap_minutes?: IntFieldUpdateOperationsInput | number
    min_version_major?: IntFieldUpdateOperationsInput | number
    max_version_major?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
  }

  export type spot_visitsCreateManyInput = {
    id: string
    user_id: string
    spot_id: string
    represent_guide_id: string
    taken_photo_storage_path?: string | null
    prev_spot_id?: string | null
    time_gap_minutes: number
    min_version_major: number
    max_version_major: number
    created_at?: Date | string
    updated_at?: Date | string
    lock_no?: number
  }

  export type spot_visitsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    taken_photo_storage_path?: NullableStringFieldUpdateOperationsInput | string | null
    time_gap_minutes?: IntFieldUpdateOperationsInput | number
    min_version_major?: IntFieldUpdateOperationsInput | number
    max_version_major?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
  }

  export type spot_visitsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    spot_id?: StringFieldUpdateOperationsInput | string
    represent_guide_id?: StringFieldUpdateOperationsInput | string
    taken_photo_storage_path?: NullableStringFieldUpdateOperationsInput | string | null
    prev_spot_id?: NullableStringFieldUpdateOperationsInput | string | null
    time_gap_minutes?: IntFieldUpdateOperationsInput | number
    min_version_major?: IntFieldUpdateOperationsInput | number
    max_version_major?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type Enumbackend_event_logs_error_levelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.backend_event_logs_error_level | Enumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    in?: $Enums.backend_event_logs_error_level[] | ListEnumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.backend_event_logs_error_level[] | ListEnumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumbackend_event_logs_error_levelNullableFilter<$PrismaModel> | $Enums.backend_event_logs_error_level | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type backend_event_logsCountOrderByAggregateInput = {
    id?: SortOrder
    event_name?: SortOrder
    error_level?: SortOrder
    function_name?: SortOrder
    user_id?: SortOrder
    payload?: SortOrder
    request_id?: SortOrder
    created_at?: SortOrder
    created_commit_id?: SortOrder
  }

  export type backend_event_logsMaxOrderByAggregateInput = {
    id?: SortOrder
    event_name?: SortOrder
    error_level?: SortOrder
    function_name?: SortOrder
    user_id?: SortOrder
    request_id?: SortOrder
    created_at?: SortOrder
    created_commit_id?: SortOrder
  }

  export type backend_event_logsMinOrderByAggregateInput = {
    id?: SortOrder
    event_name?: SortOrder
    error_level?: SortOrder
    function_name?: SortOrder
    user_id?: SortOrder
    request_id?: SortOrder
    created_at?: SortOrder
    created_commit_id?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type Enumbackend_event_logs_error_levelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.backend_event_logs_error_level | Enumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    in?: $Enums.backend_event_logs_error_level[] | ListEnumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.backend_event_logs_error_level[] | ListEnumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumbackend_event_logs_error_levelNullableWithAggregatesFilter<$PrismaModel> | $Enums.backend_event_logs_error_level | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumbackend_event_logs_error_levelNullableFilter<$PrismaModel>
    _max?: NestedEnumbackend_event_logs_error_levelNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type Enumext_spots_source_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.ext_spots_source_type | Enumext_spots_source_typeFieldRefInput<$PrismaModel>
    in?: $Enums.ext_spots_source_type[] | ListEnumext_spots_source_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ext_spots_source_type[] | ListEnumext_spots_source_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumext_spots_source_typeFilter<$PrismaModel> | $Enums.ext_spots_source_type
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type Spot_guidesListRelationFilter = {
    every?: spot_guidesWhereInput
    some?: spot_guidesWhereInput
    none?: spot_guidesWhereInput
  }

  export type Spot_visitsListRelationFilter = {
    every?: spot_visitsWhereInput
    some?: spot_visitsWhereInput
    none?: spot_visitsWhereInput
  }

  export type spot_guidesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type spot_visitsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ext_spotsCountOrderByAggregateInput = {
    id?: SortOrder
    source_type?: SortOrder
    title?: SortOrder
    image_url?: SortOrder
    landmark_latitude?: SortOrder
    landmark_longitude?: SortOrder
    is_recommendable?: SortOrder
    created_at?: SortOrder
    lock_no?: SortOrder
  }

  export type ext_spotsAvgOrderByAggregateInput = {
    landmark_latitude?: SortOrder
    landmark_longitude?: SortOrder
    lock_no?: SortOrder
  }

  export type ext_spotsMaxOrderByAggregateInput = {
    id?: SortOrder
    source_type?: SortOrder
    title?: SortOrder
    image_url?: SortOrder
    landmark_latitude?: SortOrder
    landmark_longitude?: SortOrder
    is_recommendable?: SortOrder
    created_at?: SortOrder
    lock_no?: SortOrder
  }

  export type ext_spotsMinOrderByAggregateInput = {
    id?: SortOrder
    source_type?: SortOrder
    title?: SortOrder
    image_url?: SortOrder
    landmark_latitude?: SortOrder
    landmark_longitude?: SortOrder
    is_recommendable?: SortOrder
    created_at?: SortOrder
    lock_no?: SortOrder
  }

  export type ext_spotsSumOrderByAggregateInput = {
    landmark_latitude?: SortOrder
    landmark_longitude?: SortOrder
    lock_no?: SortOrder
  }

  export type Enumext_spots_source_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ext_spots_source_type | Enumext_spots_source_typeFieldRefInput<$PrismaModel>
    in?: $Enums.ext_spots_source_type[] | ListEnumext_spots_source_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ext_spots_source_type[] | ListEnumext_spots_source_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumext_spots_source_typeWithAggregatesFilter<$PrismaModel> | $Enums.ext_spots_source_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumext_spots_source_typeFilter<$PrismaModel>
    _max?: NestedEnumext_spots_source_typeFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type external_api_logsCountOrderByAggregateInput = {
    id?: SortOrder
    request_id?: SortOrder
    function_name?: SortOrder
    api_name?: SortOrder
    endpoint?: SortOrder
    request_payload?: SortOrder
    response_payload?: SortOrder
    status_code?: SortOrder
    error_message?: SortOrder
    response_time_ms?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    created_commit_id?: SortOrder
  }

  export type external_api_logsAvgOrderByAggregateInput = {
    status_code?: SortOrder
    response_time_ms?: SortOrder
  }

  export type external_api_logsMaxOrderByAggregateInput = {
    id?: SortOrder
    request_id?: SortOrder
    function_name?: SortOrder
    api_name?: SortOrder
    endpoint?: SortOrder
    status_code?: SortOrder
    error_message?: SortOrder
    response_time_ms?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    created_commit_id?: SortOrder
  }

  export type external_api_logsMinOrderByAggregateInput = {
    id?: SortOrder
    request_id?: SortOrder
    function_name?: SortOrder
    api_name?: SortOrder
    endpoint?: SortOrder
    status_code?: SortOrder
    error_message?: SortOrder
    response_time_ms?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    created_commit_id?: SortOrder
  }

  export type external_api_logsSumOrderByAggregateInput = {
    status_code?: SortOrder
    response_time_ms?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type Enumfrontend_event_logs_error_levelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.frontend_event_logs_error_level | Enumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    in?: $Enums.frontend_event_logs_error_level[] | ListEnumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.frontend_event_logs_error_level[] | ListEnumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumfrontend_event_logs_error_levelNullableFilter<$PrismaModel> | $Enums.frontend_event_logs_error_level | null
  }

  export type frontend_event_logsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_name?: SortOrder
    error_level?: SortOrder
    screen_name?: SortOrder
    payload?: SortOrder
    created_at?: SortOrder
    created_app_version?: SortOrder
    created_commit_id?: SortOrder
  }

  export type frontend_event_logsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_name?: SortOrder
    error_level?: SortOrder
    screen_name?: SortOrder
    payload?: SortOrder
    created_at?: SortOrder
    created_app_version?: SortOrder
    created_commit_id?: SortOrder
  }

  export type frontend_event_logsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_name?: SortOrder
    error_level?: SortOrder
    screen_name?: SortOrder
    payload?: SortOrder
    created_at?: SortOrder
    created_app_version?: SortOrder
    created_commit_id?: SortOrder
  }

  export type Enumfrontend_event_logs_error_levelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.frontend_event_logs_error_level | Enumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    in?: $Enums.frontend_event_logs_error_level[] | ListEnumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.frontend_event_logs_error_level[] | ListEnumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumfrontend_event_logs_error_levelNullableWithAggregatesFilter<$PrismaModel> | $Enums.frontend_event_logs_error_level | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumfrontend_event_logs_error_levelNullableFilter<$PrismaModel>
    _max?: NestedEnumfrontend_event_logs_error_levelNullableFilter<$PrismaModel>
  }

  export type Enumspot_guides_voice_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.spot_guides_voice_type | Enumspot_guides_voice_typeFieldRefInput<$PrismaModel>
    in?: $Enums.spot_guides_voice_type[] | ListEnumspot_guides_voice_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.spot_guides_voice_type[] | ListEnumspot_guides_voice_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumspot_guides_voice_typeFilter<$PrismaModel> | $Enums.spot_guides_voice_type
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type Ext_spotsScalarRelationFilter = {
    is?: ext_spotsWhereInput
    isNot?: ext_spotsWhereInput
  }

  export type spot_guidesCountOrderByAggregateInput = {
    id?: SortOrder
    spot_id?: SortOrder
    lang?: SortOrder
    title?: SortOrder
    manuscript?: SortOrder
    audio_storage_path?: SortOrder
    voice_type?: SortOrder
    tags?: SortOrder
    price_amount?: SortOrder
    currency?: SortOrder
    recommendation_weight?: SortOrder
    min_version_major?: SortOrder
    max_version_major?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    created_request_id?: SortOrder
    lock_no?: SortOrder
  }

  export type spot_guidesAvgOrderByAggregateInput = {
    price_amount?: SortOrder
    recommendation_weight?: SortOrder
    min_version_major?: SortOrder
    max_version_major?: SortOrder
    lock_no?: SortOrder
  }

  export type spot_guidesMaxOrderByAggregateInput = {
    id?: SortOrder
    spot_id?: SortOrder
    lang?: SortOrder
    title?: SortOrder
    manuscript?: SortOrder
    audio_storage_path?: SortOrder
    voice_type?: SortOrder
    price_amount?: SortOrder
    currency?: SortOrder
    recommendation_weight?: SortOrder
    min_version_major?: SortOrder
    max_version_major?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    created_request_id?: SortOrder
    lock_no?: SortOrder
  }

  export type spot_guidesMinOrderByAggregateInput = {
    id?: SortOrder
    spot_id?: SortOrder
    lang?: SortOrder
    title?: SortOrder
    manuscript?: SortOrder
    audio_storage_path?: SortOrder
    voice_type?: SortOrder
    price_amount?: SortOrder
    currency?: SortOrder
    recommendation_weight?: SortOrder
    min_version_major?: SortOrder
    max_version_major?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    created_request_id?: SortOrder
    lock_no?: SortOrder
  }

  export type spot_guidesSumOrderByAggregateInput = {
    price_amount?: SortOrder
    recommendation_weight?: SortOrder
    min_version_major?: SortOrder
    max_version_major?: SortOrder
    lock_no?: SortOrder
  }

  export type Enumspot_guides_voice_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.spot_guides_voice_type | Enumspot_guides_voice_typeFieldRefInput<$PrismaModel>
    in?: $Enums.spot_guides_voice_type[] | ListEnumspot_guides_voice_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.spot_guides_voice_type[] | ListEnumspot_guides_voice_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumspot_guides_voice_typeWithAggregatesFilter<$PrismaModel> | $Enums.spot_guides_voice_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumspot_guides_voice_typeFilter<$PrismaModel>
    _max?: NestedEnumspot_guides_voice_typeFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type Ext_spotsNullableScalarRelationFilter = {
    is?: ext_spotsWhereInput | null
    isNot?: ext_spotsWhereInput | null
  }

  export type Spot_guidesScalarRelationFilter = {
    is?: spot_guidesWhereInput
    isNot?: spot_guidesWhereInput
  }

  export type spot_visitsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    spot_id?: SortOrder
    represent_guide_id?: SortOrder
    taken_photo_storage_path?: SortOrder
    prev_spot_id?: SortOrder
    time_gap_minutes?: SortOrder
    min_version_major?: SortOrder
    max_version_major?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    lock_no?: SortOrder
  }

  export type spot_visitsAvgOrderByAggregateInput = {
    time_gap_minutes?: SortOrder
    min_version_major?: SortOrder
    max_version_major?: SortOrder
    lock_no?: SortOrder
  }

  export type spot_visitsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    spot_id?: SortOrder
    represent_guide_id?: SortOrder
    taken_photo_storage_path?: SortOrder
    prev_spot_id?: SortOrder
    time_gap_minutes?: SortOrder
    min_version_major?: SortOrder
    max_version_major?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    lock_no?: SortOrder
  }

  export type spot_visitsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    spot_id?: SortOrder
    represent_guide_id?: SortOrder
    taken_photo_storage_path?: SortOrder
    prev_spot_id?: SortOrder
    time_gap_minutes?: SortOrder
    min_version_major?: SortOrder
    max_version_major?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    lock_no?: SortOrder
  }

  export type spot_visitsSumOrderByAggregateInput = {
    time_gap_minutes?: SortOrder
    min_version_major?: SortOrder
    max_version_major?: SortOrder
    lock_no?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableEnumbackend_event_logs_error_levelFieldUpdateOperationsInput = {
    set?: $Enums.backend_event_logs_error_level | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type spot_guidesCreateNestedManyWithoutExt_spotsInput = {
    create?: XOR<spot_guidesCreateWithoutExt_spotsInput, spot_guidesUncheckedCreateWithoutExt_spotsInput> | spot_guidesCreateWithoutExt_spotsInput[] | spot_guidesUncheckedCreateWithoutExt_spotsInput[]
    connectOrCreate?: spot_guidesCreateOrConnectWithoutExt_spotsInput | spot_guidesCreateOrConnectWithoutExt_spotsInput[]
    createMany?: spot_guidesCreateManyExt_spotsInputEnvelope
    connect?: spot_guidesWhereUniqueInput | spot_guidesWhereUniqueInput[]
  }

  export type spot_visitsCreateNestedManyWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput = {
    create?: XOR<spot_visitsCreateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput, spot_visitsUncheckedCreateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput> | spot_visitsCreateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput[] | spot_visitsUncheckedCreateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput[]
    connectOrCreate?: spot_visitsCreateOrConnectWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput | spot_visitsCreateOrConnectWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput[]
    createMany?: spot_visitsCreateManyExt_spots_spot_visits_prev_spot_idToext_spotsInputEnvelope
    connect?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
  }

  export type spot_visitsCreateNestedManyWithoutExt_spots_spot_visits_spot_idToext_spotsInput = {
    create?: XOR<spot_visitsCreateWithoutExt_spots_spot_visits_spot_idToext_spotsInput, spot_visitsUncheckedCreateWithoutExt_spots_spot_visits_spot_idToext_spotsInput> | spot_visitsCreateWithoutExt_spots_spot_visits_spot_idToext_spotsInput[] | spot_visitsUncheckedCreateWithoutExt_spots_spot_visits_spot_idToext_spotsInput[]
    connectOrCreate?: spot_visitsCreateOrConnectWithoutExt_spots_spot_visits_spot_idToext_spotsInput | spot_visitsCreateOrConnectWithoutExt_spots_spot_visits_spot_idToext_spotsInput[]
    createMany?: spot_visitsCreateManyExt_spots_spot_visits_spot_idToext_spotsInputEnvelope
    connect?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
  }

  export type spot_guidesUncheckedCreateNestedManyWithoutExt_spotsInput = {
    create?: XOR<spot_guidesCreateWithoutExt_spotsInput, spot_guidesUncheckedCreateWithoutExt_spotsInput> | spot_guidesCreateWithoutExt_spotsInput[] | spot_guidesUncheckedCreateWithoutExt_spotsInput[]
    connectOrCreate?: spot_guidesCreateOrConnectWithoutExt_spotsInput | spot_guidesCreateOrConnectWithoutExt_spotsInput[]
    createMany?: spot_guidesCreateManyExt_spotsInputEnvelope
    connect?: spot_guidesWhereUniqueInput | spot_guidesWhereUniqueInput[]
  }

  export type spot_visitsUncheckedCreateNestedManyWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput = {
    create?: XOR<spot_visitsCreateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput, spot_visitsUncheckedCreateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput> | spot_visitsCreateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput[] | spot_visitsUncheckedCreateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput[]
    connectOrCreate?: spot_visitsCreateOrConnectWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput | spot_visitsCreateOrConnectWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput[]
    createMany?: spot_visitsCreateManyExt_spots_spot_visits_prev_spot_idToext_spotsInputEnvelope
    connect?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
  }

  export type spot_visitsUncheckedCreateNestedManyWithoutExt_spots_spot_visits_spot_idToext_spotsInput = {
    create?: XOR<spot_visitsCreateWithoutExt_spots_spot_visits_spot_idToext_spotsInput, spot_visitsUncheckedCreateWithoutExt_spots_spot_visits_spot_idToext_spotsInput> | spot_visitsCreateWithoutExt_spots_spot_visits_spot_idToext_spotsInput[] | spot_visitsUncheckedCreateWithoutExt_spots_spot_visits_spot_idToext_spotsInput[]
    connectOrCreate?: spot_visitsCreateOrConnectWithoutExt_spots_spot_visits_spot_idToext_spotsInput | spot_visitsCreateOrConnectWithoutExt_spots_spot_visits_spot_idToext_spotsInput[]
    createMany?: spot_visitsCreateManyExt_spots_spot_visits_spot_idToext_spotsInputEnvelope
    connect?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
  }

  export type Enumext_spots_source_typeFieldUpdateOperationsInput = {
    set?: $Enums.ext_spots_source_type
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type spot_guidesUpdateManyWithoutExt_spotsNestedInput = {
    create?: XOR<spot_guidesCreateWithoutExt_spotsInput, spot_guidesUncheckedCreateWithoutExt_spotsInput> | spot_guidesCreateWithoutExt_spotsInput[] | spot_guidesUncheckedCreateWithoutExt_spotsInput[]
    connectOrCreate?: spot_guidesCreateOrConnectWithoutExt_spotsInput | spot_guidesCreateOrConnectWithoutExt_spotsInput[]
    upsert?: spot_guidesUpsertWithWhereUniqueWithoutExt_spotsInput | spot_guidesUpsertWithWhereUniqueWithoutExt_spotsInput[]
    createMany?: spot_guidesCreateManyExt_spotsInputEnvelope
    set?: spot_guidesWhereUniqueInput | spot_guidesWhereUniqueInput[]
    disconnect?: spot_guidesWhereUniqueInput | spot_guidesWhereUniqueInput[]
    delete?: spot_guidesWhereUniqueInput | spot_guidesWhereUniqueInput[]
    connect?: spot_guidesWhereUniqueInput | spot_guidesWhereUniqueInput[]
    update?: spot_guidesUpdateWithWhereUniqueWithoutExt_spotsInput | spot_guidesUpdateWithWhereUniqueWithoutExt_spotsInput[]
    updateMany?: spot_guidesUpdateManyWithWhereWithoutExt_spotsInput | spot_guidesUpdateManyWithWhereWithoutExt_spotsInput[]
    deleteMany?: spot_guidesScalarWhereInput | spot_guidesScalarWhereInput[]
  }

  export type spot_visitsUpdateManyWithoutExt_spots_spot_visits_prev_spot_idToext_spotsNestedInput = {
    create?: XOR<spot_visitsCreateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput, spot_visitsUncheckedCreateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput> | spot_visitsCreateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput[] | spot_visitsUncheckedCreateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput[]
    connectOrCreate?: spot_visitsCreateOrConnectWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput | spot_visitsCreateOrConnectWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput[]
    upsert?: spot_visitsUpsertWithWhereUniqueWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput | spot_visitsUpsertWithWhereUniqueWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput[]
    createMany?: spot_visitsCreateManyExt_spots_spot_visits_prev_spot_idToext_spotsInputEnvelope
    set?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    disconnect?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    delete?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    connect?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    update?: spot_visitsUpdateWithWhereUniqueWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput | spot_visitsUpdateWithWhereUniqueWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput[]
    updateMany?: spot_visitsUpdateManyWithWhereWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput | spot_visitsUpdateManyWithWhereWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput[]
    deleteMany?: spot_visitsScalarWhereInput | spot_visitsScalarWhereInput[]
  }

  export type spot_visitsUpdateManyWithoutExt_spots_spot_visits_spot_idToext_spotsNestedInput = {
    create?: XOR<spot_visitsCreateWithoutExt_spots_spot_visits_spot_idToext_spotsInput, spot_visitsUncheckedCreateWithoutExt_spots_spot_visits_spot_idToext_spotsInput> | spot_visitsCreateWithoutExt_spots_spot_visits_spot_idToext_spotsInput[] | spot_visitsUncheckedCreateWithoutExt_spots_spot_visits_spot_idToext_spotsInput[]
    connectOrCreate?: spot_visitsCreateOrConnectWithoutExt_spots_spot_visits_spot_idToext_spotsInput | spot_visitsCreateOrConnectWithoutExt_spots_spot_visits_spot_idToext_spotsInput[]
    upsert?: spot_visitsUpsertWithWhereUniqueWithoutExt_spots_spot_visits_spot_idToext_spotsInput | spot_visitsUpsertWithWhereUniqueWithoutExt_spots_spot_visits_spot_idToext_spotsInput[]
    createMany?: spot_visitsCreateManyExt_spots_spot_visits_spot_idToext_spotsInputEnvelope
    set?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    disconnect?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    delete?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    connect?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    update?: spot_visitsUpdateWithWhereUniqueWithoutExt_spots_spot_visits_spot_idToext_spotsInput | spot_visitsUpdateWithWhereUniqueWithoutExt_spots_spot_visits_spot_idToext_spotsInput[]
    updateMany?: spot_visitsUpdateManyWithWhereWithoutExt_spots_spot_visits_spot_idToext_spotsInput | spot_visitsUpdateManyWithWhereWithoutExt_spots_spot_visits_spot_idToext_spotsInput[]
    deleteMany?: spot_visitsScalarWhereInput | spot_visitsScalarWhereInput[]
  }

  export type spot_guidesUncheckedUpdateManyWithoutExt_spotsNestedInput = {
    create?: XOR<spot_guidesCreateWithoutExt_spotsInput, spot_guidesUncheckedCreateWithoutExt_spotsInput> | spot_guidesCreateWithoutExt_spotsInput[] | spot_guidesUncheckedCreateWithoutExt_spotsInput[]
    connectOrCreate?: spot_guidesCreateOrConnectWithoutExt_spotsInput | spot_guidesCreateOrConnectWithoutExt_spotsInput[]
    upsert?: spot_guidesUpsertWithWhereUniqueWithoutExt_spotsInput | spot_guidesUpsertWithWhereUniqueWithoutExt_spotsInput[]
    createMany?: spot_guidesCreateManyExt_spotsInputEnvelope
    set?: spot_guidesWhereUniqueInput | spot_guidesWhereUniqueInput[]
    disconnect?: spot_guidesWhereUniqueInput | spot_guidesWhereUniqueInput[]
    delete?: spot_guidesWhereUniqueInput | spot_guidesWhereUniqueInput[]
    connect?: spot_guidesWhereUniqueInput | spot_guidesWhereUniqueInput[]
    update?: spot_guidesUpdateWithWhereUniqueWithoutExt_spotsInput | spot_guidesUpdateWithWhereUniqueWithoutExt_spotsInput[]
    updateMany?: spot_guidesUpdateManyWithWhereWithoutExt_spotsInput | spot_guidesUpdateManyWithWhereWithoutExt_spotsInput[]
    deleteMany?: spot_guidesScalarWhereInput | spot_guidesScalarWhereInput[]
  }

  export type spot_visitsUncheckedUpdateManyWithoutExt_spots_spot_visits_prev_spot_idToext_spotsNestedInput = {
    create?: XOR<spot_visitsCreateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput, spot_visitsUncheckedCreateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput> | spot_visitsCreateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput[] | spot_visitsUncheckedCreateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput[]
    connectOrCreate?: spot_visitsCreateOrConnectWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput | spot_visitsCreateOrConnectWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput[]
    upsert?: spot_visitsUpsertWithWhereUniqueWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput | spot_visitsUpsertWithWhereUniqueWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput[]
    createMany?: spot_visitsCreateManyExt_spots_spot_visits_prev_spot_idToext_spotsInputEnvelope
    set?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    disconnect?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    delete?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    connect?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    update?: spot_visitsUpdateWithWhereUniqueWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput | spot_visitsUpdateWithWhereUniqueWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput[]
    updateMany?: spot_visitsUpdateManyWithWhereWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput | spot_visitsUpdateManyWithWhereWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput[]
    deleteMany?: spot_visitsScalarWhereInput | spot_visitsScalarWhereInput[]
  }

  export type spot_visitsUncheckedUpdateManyWithoutExt_spots_spot_visits_spot_idToext_spotsNestedInput = {
    create?: XOR<spot_visitsCreateWithoutExt_spots_spot_visits_spot_idToext_spotsInput, spot_visitsUncheckedCreateWithoutExt_spots_spot_visits_spot_idToext_spotsInput> | spot_visitsCreateWithoutExt_spots_spot_visits_spot_idToext_spotsInput[] | spot_visitsUncheckedCreateWithoutExt_spots_spot_visits_spot_idToext_spotsInput[]
    connectOrCreate?: spot_visitsCreateOrConnectWithoutExt_spots_spot_visits_spot_idToext_spotsInput | spot_visitsCreateOrConnectWithoutExt_spots_spot_visits_spot_idToext_spotsInput[]
    upsert?: spot_visitsUpsertWithWhereUniqueWithoutExt_spots_spot_visits_spot_idToext_spotsInput | spot_visitsUpsertWithWhereUniqueWithoutExt_spots_spot_visits_spot_idToext_spotsInput[]
    createMany?: spot_visitsCreateManyExt_spots_spot_visits_spot_idToext_spotsInputEnvelope
    set?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    disconnect?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    delete?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    connect?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    update?: spot_visitsUpdateWithWhereUniqueWithoutExt_spots_spot_visits_spot_idToext_spotsInput | spot_visitsUpdateWithWhereUniqueWithoutExt_spots_spot_visits_spot_idToext_spotsInput[]
    updateMany?: spot_visitsUpdateManyWithWhereWithoutExt_spots_spot_visits_spot_idToext_spotsInput | spot_visitsUpdateManyWithWhereWithoutExt_spots_spot_visits_spot_idToext_spotsInput[]
    deleteMany?: spot_visitsScalarWhereInput | spot_visitsScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumfrontend_event_logs_error_levelFieldUpdateOperationsInput = {
    set?: $Enums.frontend_event_logs_error_level | null
  }

  export type spot_guidesCreatetagsInput = {
    set: string[]
  }

  export type ext_spotsCreateNestedOneWithoutSpot_guidesInput = {
    create?: XOR<ext_spotsCreateWithoutSpot_guidesInput, ext_spotsUncheckedCreateWithoutSpot_guidesInput>
    connectOrCreate?: ext_spotsCreateOrConnectWithoutSpot_guidesInput
    connect?: ext_spotsWhereUniqueInput
  }

  export type spot_visitsCreateNestedManyWithoutSpot_guidesInput = {
    create?: XOR<spot_visitsCreateWithoutSpot_guidesInput, spot_visitsUncheckedCreateWithoutSpot_guidesInput> | spot_visitsCreateWithoutSpot_guidesInput[] | spot_visitsUncheckedCreateWithoutSpot_guidesInput[]
    connectOrCreate?: spot_visitsCreateOrConnectWithoutSpot_guidesInput | spot_visitsCreateOrConnectWithoutSpot_guidesInput[]
    createMany?: spot_visitsCreateManySpot_guidesInputEnvelope
    connect?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
  }

  export type spot_visitsUncheckedCreateNestedManyWithoutSpot_guidesInput = {
    create?: XOR<spot_visitsCreateWithoutSpot_guidesInput, spot_visitsUncheckedCreateWithoutSpot_guidesInput> | spot_visitsCreateWithoutSpot_guidesInput[] | spot_visitsUncheckedCreateWithoutSpot_guidesInput[]
    connectOrCreate?: spot_visitsCreateOrConnectWithoutSpot_guidesInput | spot_visitsCreateOrConnectWithoutSpot_guidesInput[]
    createMany?: spot_visitsCreateManySpot_guidesInputEnvelope
    connect?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
  }

  export type Enumspot_guides_voice_typeFieldUpdateOperationsInput = {
    set?: $Enums.spot_guides_voice_type
  }

  export type spot_guidesUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type ext_spotsUpdateOneRequiredWithoutSpot_guidesNestedInput = {
    create?: XOR<ext_spotsCreateWithoutSpot_guidesInput, ext_spotsUncheckedCreateWithoutSpot_guidesInput>
    connectOrCreate?: ext_spotsCreateOrConnectWithoutSpot_guidesInput
    upsert?: ext_spotsUpsertWithoutSpot_guidesInput
    connect?: ext_spotsWhereUniqueInput
    update?: XOR<XOR<ext_spotsUpdateToOneWithWhereWithoutSpot_guidesInput, ext_spotsUpdateWithoutSpot_guidesInput>, ext_spotsUncheckedUpdateWithoutSpot_guidesInput>
  }

  export type spot_visitsUpdateManyWithoutSpot_guidesNestedInput = {
    create?: XOR<spot_visitsCreateWithoutSpot_guidesInput, spot_visitsUncheckedCreateWithoutSpot_guidesInput> | spot_visitsCreateWithoutSpot_guidesInput[] | spot_visitsUncheckedCreateWithoutSpot_guidesInput[]
    connectOrCreate?: spot_visitsCreateOrConnectWithoutSpot_guidesInput | spot_visitsCreateOrConnectWithoutSpot_guidesInput[]
    upsert?: spot_visitsUpsertWithWhereUniqueWithoutSpot_guidesInput | spot_visitsUpsertWithWhereUniqueWithoutSpot_guidesInput[]
    createMany?: spot_visitsCreateManySpot_guidesInputEnvelope
    set?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    disconnect?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    delete?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    connect?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    update?: spot_visitsUpdateWithWhereUniqueWithoutSpot_guidesInput | spot_visitsUpdateWithWhereUniqueWithoutSpot_guidesInput[]
    updateMany?: spot_visitsUpdateManyWithWhereWithoutSpot_guidesInput | spot_visitsUpdateManyWithWhereWithoutSpot_guidesInput[]
    deleteMany?: spot_visitsScalarWhereInput | spot_visitsScalarWhereInput[]
  }

  export type spot_visitsUncheckedUpdateManyWithoutSpot_guidesNestedInput = {
    create?: XOR<spot_visitsCreateWithoutSpot_guidesInput, spot_visitsUncheckedCreateWithoutSpot_guidesInput> | spot_visitsCreateWithoutSpot_guidesInput[] | spot_visitsUncheckedCreateWithoutSpot_guidesInput[]
    connectOrCreate?: spot_visitsCreateOrConnectWithoutSpot_guidesInput | spot_visitsCreateOrConnectWithoutSpot_guidesInput[]
    upsert?: spot_visitsUpsertWithWhereUniqueWithoutSpot_guidesInput | spot_visitsUpsertWithWhereUniqueWithoutSpot_guidesInput[]
    createMany?: spot_visitsCreateManySpot_guidesInputEnvelope
    set?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    disconnect?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    delete?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    connect?: spot_visitsWhereUniqueInput | spot_visitsWhereUniqueInput[]
    update?: spot_visitsUpdateWithWhereUniqueWithoutSpot_guidesInput | spot_visitsUpdateWithWhereUniqueWithoutSpot_guidesInput[]
    updateMany?: spot_visitsUpdateManyWithWhereWithoutSpot_guidesInput | spot_visitsUpdateManyWithWhereWithoutSpot_guidesInput[]
    deleteMany?: spot_visitsScalarWhereInput | spot_visitsScalarWhereInput[]
  }

  export type ext_spotsCreateNestedOneWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput = {
    create?: XOR<ext_spotsCreateWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput, ext_spotsUncheckedCreateWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput>
    connectOrCreate?: ext_spotsCreateOrConnectWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput
    connect?: ext_spotsWhereUniqueInput
  }

  export type spot_guidesCreateNestedOneWithoutSpot_visitsInput = {
    create?: XOR<spot_guidesCreateWithoutSpot_visitsInput, spot_guidesUncheckedCreateWithoutSpot_visitsInput>
    connectOrCreate?: spot_guidesCreateOrConnectWithoutSpot_visitsInput
    connect?: spot_guidesWhereUniqueInput
  }

  export type ext_spotsCreateNestedOneWithoutSpot_visits_spot_visits_spot_idToext_spotsInput = {
    create?: XOR<ext_spotsCreateWithoutSpot_visits_spot_visits_spot_idToext_spotsInput, ext_spotsUncheckedCreateWithoutSpot_visits_spot_visits_spot_idToext_spotsInput>
    connectOrCreate?: ext_spotsCreateOrConnectWithoutSpot_visits_spot_visits_spot_idToext_spotsInput
    connect?: ext_spotsWhereUniqueInput
  }

  export type ext_spotsUpdateOneWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsNestedInput = {
    create?: XOR<ext_spotsCreateWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput, ext_spotsUncheckedCreateWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput>
    connectOrCreate?: ext_spotsCreateOrConnectWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput
    upsert?: ext_spotsUpsertWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput
    disconnect?: ext_spotsWhereInput | boolean
    delete?: ext_spotsWhereInput | boolean
    connect?: ext_spotsWhereUniqueInput
    update?: XOR<XOR<ext_spotsUpdateToOneWithWhereWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput, ext_spotsUpdateWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput>, ext_spotsUncheckedUpdateWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput>
  }

  export type spot_guidesUpdateOneRequiredWithoutSpot_visitsNestedInput = {
    create?: XOR<spot_guidesCreateWithoutSpot_visitsInput, spot_guidesUncheckedCreateWithoutSpot_visitsInput>
    connectOrCreate?: spot_guidesCreateOrConnectWithoutSpot_visitsInput
    upsert?: spot_guidesUpsertWithoutSpot_visitsInput
    connect?: spot_guidesWhereUniqueInput
    update?: XOR<XOR<spot_guidesUpdateToOneWithWhereWithoutSpot_visitsInput, spot_guidesUpdateWithoutSpot_visitsInput>, spot_guidesUncheckedUpdateWithoutSpot_visitsInput>
  }

  export type ext_spotsUpdateOneRequiredWithoutSpot_visits_spot_visits_spot_idToext_spotsNestedInput = {
    create?: XOR<ext_spotsCreateWithoutSpot_visits_spot_visits_spot_idToext_spotsInput, ext_spotsUncheckedCreateWithoutSpot_visits_spot_visits_spot_idToext_spotsInput>
    connectOrCreate?: ext_spotsCreateOrConnectWithoutSpot_visits_spot_visits_spot_idToext_spotsInput
    upsert?: ext_spotsUpsertWithoutSpot_visits_spot_visits_spot_idToext_spotsInput
    connect?: ext_spotsWhereUniqueInput
    update?: XOR<XOR<ext_spotsUpdateToOneWithWhereWithoutSpot_visits_spot_visits_spot_idToext_spotsInput, ext_spotsUpdateWithoutSpot_visits_spot_visits_spot_idToext_spotsInput>, ext_spotsUncheckedUpdateWithoutSpot_visits_spot_visits_spot_idToext_spotsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumbackend_event_logs_error_levelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.backend_event_logs_error_level | Enumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    in?: $Enums.backend_event_logs_error_level[] | ListEnumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.backend_event_logs_error_level[] | ListEnumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumbackend_event_logs_error_levelNullableFilter<$PrismaModel> | $Enums.backend_event_logs_error_level | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumbackend_event_logs_error_levelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.backend_event_logs_error_level | Enumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    in?: $Enums.backend_event_logs_error_level[] | ListEnumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.backend_event_logs_error_level[] | ListEnumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumbackend_event_logs_error_levelNullableWithAggregatesFilter<$PrismaModel> | $Enums.backend_event_logs_error_level | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumbackend_event_logs_error_levelNullableFilter<$PrismaModel>
    _max?: NestedEnumbackend_event_logs_error_levelNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumext_spots_source_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.ext_spots_source_type | Enumext_spots_source_typeFieldRefInput<$PrismaModel>
    in?: $Enums.ext_spots_source_type[] | ListEnumext_spots_source_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ext_spots_source_type[] | ListEnumext_spots_source_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumext_spots_source_typeFilter<$PrismaModel> | $Enums.ext_spots_source_type
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumext_spots_source_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ext_spots_source_type | Enumext_spots_source_typeFieldRefInput<$PrismaModel>
    in?: $Enums.ext_spots_source_type[] | ListEnumext_spots_source_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ext_spots_source_type[] | ListEnumext_spots_source_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumext_spots_source_typeWithAggregatesFilter<$PrismaModel> | $Enums.ext_spots_source_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumext_spots_source_typeFilter<$PrismaModel>
    _max?: NestedEnumext_spots_source_typeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumfrontend_event_logs_error_levelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.frontend_event_logs_error_level | Enumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    in?: $Enums.frontend_event_logs_error_level[] | ListEnumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.frontend_event_logs_error_level[] | ListEnumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumfrontend_event_logs_error_levelNullableFilter<$PrismaModel> | $Enums.frontend_event_logs_error_level | null
  }

  export type NestedEnumfrontend_event_logs_error_levelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.frontend_event_logs_error_level | Enumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    in?: $Enums.frontend_event_logs_error_level[] | ListEnumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.frontend_event_logs_error_level[] | ListEnumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumfrontend_event_logs_error_levelNullableWithAggregatesFilter<$PrismaModel> | $Enums.frontend_event_logs_error_level | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumfrontend_event_logs_error_levelNullableFilter<$PrismaModel>
    _max?: NestedEnumfrontend_event_logs_error_levelNullableFilter<$PrismaModel>
  }

  export type NestedEnumspot_guides_voice_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.spot_guides_voice_type | Enumspot_guides_voice_typeFieldRefInput<$PrismaModel>
    in?: $Enums.spot_guides_voice_type[] | ListEnumspot_guides_voice_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.spot_guides_voice_type[] | ListEnumspot_guides_voice_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumspot_guides_voice_typeFilter<$PrismaModel> | $Enums.spot_guides_voice_type
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumspot_guides_voice_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.spot_guides_voice_type | Enumspot_guides_voice_typeFieldRefInput<$PrismaModel>
    in?: $Enums.spot_guides_voice_type[] | ListEnumspot_guides_voice_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.spot_guides_voice_type[] | ListEnumspot_guides_voice_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumspot_guides_voice_typeWithAggregatesFilter<$PrismaModel> | $Enums.spot_guides_voice_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumspot_guides_voice_typeFilter<$PrismaModel>
    _max?: NestedEnumspot_guides_voice_typeFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type spot_guidesCreateWithoutExt_spotsInput = {
    id: string
    lang: string
    title: string
    manuscript: string
    audio_storage_path: string
    voice_type: $Enums.spot_guides_voice_type
    tags?: spot_guidesCreatetagsInput | string[]
    price_amount: Decimal | DecimalJsLike | number | string
    currency: string
    recommendation_weight: number
    min_version_major: number
    max_version_major: number
    created_by: string
    created_at?: Date | string
    created_request_id: string
    lock_no?: number
    spot_visits?: spot_visitsCreateNestedManyWithoutSpot_guidesInput
  }

  export type spot_guidesUncheckedCreateWithoutExt_spotsInput = {
    id: string
    lang: string
    title: string
    manuscript: string
    audio_storage_path: string
    voice_type: $Enums.spot_guides_voice_type
    tags?: spot_guidesCreatetagsInput | string[]
    price_amount: Decimal | DecimalJsLike | number | string
    currency: string
    recommendation_weight: number
    min_version_major: number
    max_version_major: number
    created_by: string
    created_at?: Date | string
    created_request_id: string
    lock_no?: number
    spot_visits?: spot_visitsUncheckedCreateNestedManyWithoutSpot_guidesInput
  }

  export type spot_guidesCreateOrConnectWithoutExt_spotsInput = {
    where: spot_guidesWhereUniqueInput
    create: XOR<spot_guidesCreateWithoutExt_spotsInput, spot_guidesUncheckedCreateWithoutExt_spotsInput>
  }

  export type spot_guidesCreateManyExt_spotsInputEnvelope = {
    data: spot_guidesCreateManyExt_spotsInput | spot_guidesCreateManyExt_spotsInput[]
    skipDuplicates?: boolean
  }

  export type spot_visitsCreateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput = {
    id: string
    user_id: string
    taken_photo_storage_path?: string | null
    time_gap_minutes: number
    min_version_major: number
    max_version_major: number
    created_at?: Date | string
    updated_at?: Date | string
    lock_no?: number
    spot_guides: spot_guidesCreateNestedOneWithoutSpot_visitsInput
    ext_spots_spot_visits_spot_idToext_spots: ext_spotsCreateNestedOneWithoutSpot_visits_spot_visits_spot_idToext_spotsInput
  }

  export type spot_visitsUncheckedCreateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput = {
    id: string
    user_id: string
    spot_id: string
    represent_guide_id: string
    taken_photo_storage_path?: string | null
    time_gap_minutes: number
    min_version_major: number
    max_version_major: number
    created_at?: Date | string
    updated_at?: Date | string
    lock_no?: number
  }

  export type spot_visitsCreateOrConnectWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput = {
    where: spot_visitsWhereUniqueInput
    create: XOR<spot_visitsCreateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput, spot_visitsUncheckedCreateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput>
  }

  export type spot_visitsCreateManyExt_spots_spot_visits_prev_spot_idToext_spotsInputEnvelope = {
    data: spot_visitsCreateManyExt_spots_spot_visits_prev_spot_idToext_spotsInput | spot_visitsCreateManyExt_spots_spot_visits_prev_spot_idToext_spotsInput[]
    skipDuplicates?: boolean
  }

  export type spot_visitsCreateWithoutExt_spots_spot_visits_spot_idToext_spotsInput = {
    id: string
    user_id: string
    taken_photo_storage_path?: string | null
    time_gap_minutes: number
    min_version_major: number
    max_version_major: number
    created_at?: Date | string
    updated_at?: Date | string
    lock_no?: number
    ext_spots_spot_visits_prev_spot_idToext_spots?: ext_spotsCreateNestedOneWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput
    spot_guides: spot_guidesCreateNestedOneWithoutSpot_visitsInput
  }

  export type spot_visitsUncheckedCreateWithoutExt_spots_spot_visits_spot_idToext_spotsInput = {
    id: string
    user_id: string
    represent_guide_id: string
    taken_photo_storage_path?: string | null
    prev_spot_id?: string | null
    time_gap_minutes: number
    min_version_major: number
    max_version_major: number
    created_at?: Date | string
    updated_at?: Date | string
    lock_no?: number
  }

  export type spot_visitsCreateOrConnectWithoutExt_spots_spot_visits_spot_idToext_spotsInput = {
    where: spot_visitsWhereUniqueInput
    create: XOR<spot_visitsCreateWithoutExt_spots_spot_visits_spot_idToext_spotsInput, spot_visitsUncheckedCreateWithoutExt_spots_spot_visits_spot_idToext_spotsInput>
  }

  export type spot_visitsCreateManyExt_spots_spot_visits_spot_idToext_spotsInputEnvelope = {
    data: spot_visitsCreateManyExt_spots_spot_visits_spot_idToext_spotsInput | spot_visitsCreateManyExt_spots_spot_visits_spot_idToext_spotsInput[]
    skipDuplicates?: boolean
  }

  export type spot_guidesUpsertWithWhereUniqueWithoutExt_spotsInput = {
    where: spot_guidesWhereUniqueInput
    update: XOR<spot_guidesUpdateWithoutExt_spotsInput, spot_guidesUncheckedUpdateWithoutExt_spotsInput>
    create: XOR<spot_guidesCreateWithoutExt_spotsInput, spot_guidesUncheckedCreateWithoutExt_spotsInput>
  }

  export type spot_guidesUpdateWithWhereUniqueWithoutExt_spotsInput = {
    where: spot_guidesWhereUniqueInput
    data: XOR<spot_guidesUpdateWithoutExt_spotsInput, spot_guidesUncheckedUpdateWithoutExt_spotsInput>
  }

  export type spot_guidesUpdateManyWithWhereWithoutExt_spotsInput = {
    where: spot_guidesScalarWhereInput
    data: XOR<spot_guidesUpdateManyMutationInput, spot_guidesUncheckedUpdateManyWithoutExt_spotsInput>
  }

  export type spot_guidesScalarWhereInput = {
    AND?: spot_guidesScalarWhereInput | spot_guidesScalarWhereInput[]
    OR?: spot_guidesScalarWhereInput[]
    NOT?: spot_guidesScalarWhereInput | spot_guidesScalarWhereInput[]
    id?: StringFilter<"spot_guides"> | string
    spot_id?: StringFilter<"spot_guides"> | string
    lang?: StringFilter<"spot_guides"> | string
    title?: StringFilter<"spot_guides"> | string
    manuscript?: StringFilter<"spot_guides"> | string
    audio_storage_path?: StringFilter<"spot_guides"> | string
    voice_type?: Enumspot_guides_voice_typeFilter<"spot_guides"> | $Enums.spot_guides_voice_type
    tags?: StringNullableListFilter<"spot_guides">
    price_amount?: DecimalFilter<"spot_guides"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"spot_guides"> | string
    recommendation_weight?: IntFilter<"spot_guides"> | number
    min_version_major?: IntFilter<"spot_guides"> | number
    max_version_major?: IntFilter<"spot_guides"> | number
    created_by?: StringFilter<"spot_guides"> | string
    created_at?: DateTimeFilter<"spot_guides"> | Date | string
    created_request_id?: StringFilter<"spot_guides"> | string
    lock_no?: IntFilter<"spot_guides"> | number
  }

  export type spot_visitsUpsertWithWhereUniqueWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput = {
    where: spot_visitsWhereUniqueInput
    update: XOR<spot_visitsUpdateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput, spot_visitsUncheckedUpdateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput>
    create: XOR<spot_visitsCreateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput, spot_visitsUncheckedCreateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput>
  }

  export type spot_visitsUpdateWithWhereUniqueWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput = {
    where: spot_visitsWhereUniqueInput
    data: XOR<spot_visitsUpdateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput, spot_visitsUncheckedUpdateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput>
  }

  export type spot_visitsUpdateManyWithWhereWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput = {
    where: spot_visitsScalarWhereInput
    data: XOR<spot_visitsUpdateManyMutationInput, spot_visitsUncheckedUpdateManyWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput>
  }

  export type spot_visitsScalarWhereInput = {
    AND?: spot_visitsScalarWhereInput | spot_visitsScalarWhereInput[]
    OR?: spot_visitsScalarWhereInput[]
    NOT?: spot_visitsScalarWhereInput | spot_visitsScalarWhereInput[]
    id?: StringFilter<"spot_visits"> | string
    user_id?: StringFilter<"spot_visits"> | string
    spot_id?: StringFilter<"spot_visits"> | string
    represent_guide_id?: StringFilter<"spot_visits"> | string
    taken_photo_storage_path?: StringNullableFilter<"spot_visits"> | string | null
    prev_spot_id?: StringNullableFilter<"spot_visits"> | string | null
    time_gap_minutes?: IntFilter<"spot_visits"> | number
    min_version_major?: IntFilter<"spot_visits"> | number
    max_version_major?: IntFilter<"spot_visits"> | number
    created_at?: DateTimeFilter<"spot_visits"> | Date | string
    updated_at?: DateTimeFilter<"spot_visits"> | Date | string
    lock_no?: IntFilter<"spot_visits"> | number
  }

  export type spot_visitsUpsertWithWhereUniqueWithoutExt_spots_spot_visits_spot_idToext_spotsInput = {
    where: spot_visitsWhereUniqueInput
    update: XOR<spot_visitsUpdateWithoutExt_spots_spot_visits_spot_idToext_spotsInput, spot_visitsUncheckedUpdateWithoutExt_spots_spot_visits_spot_idToext_spotsInput>
    create: XOR<spot_visitsCreateWithoutExt_spots_spot_visits_spot_idToext_spotsInput, spot_visitsUncheckedCreateWithoutExt_spots_spot_visits_spot_idToext_spotsInput>
  }

  export type spot_visitsUpdateWithWhereUniqueWithoutExt_spots_spot_visits_spot_idToext_spotsInput = {
    where: spot_visitsWhereUniqueInput
    data: XOR<spot_visitsUpdateWithoutExt_spots_spot_visits_spot_idToext_spotsInput, spot_visitsUncheckedUpdateWithoutExt_spots_spot_visits_spot_idToext_spotsInput>
  }

  export type spot_visitsUpdateManyWithWhereWithoutExt_spots_spot_visits_spot_idToext_spotsInput = {
    where: spot_visitsScalarWhereInput
    data: XOR<spot_visitsUpdateManyMutationInput, spot_visitsUncheckedUpdateManyWithoutExt_spots_spot_visits_spot_idToext_spotsInput>
  }

  export type ext_spotsCreateWithoutSpot_guidesInput = {
    id: string
    source_type: $Enums.ext_spots_source_type
    title: string
    image_url: string
    landmark_latitude: number
    landmark_longitude: number
    is_recommendable: boolean
    created_at?: Date | string
    lock_no?: number
    spot_visits_spot_visits_prev_spot_idToext_spots?: spot_visitsCreateNestedManyWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput
    spot_visits_spot_visits_spot_idToext_spots?: spot_visitsCreateNestedManyWithoutExt_spots_spot_visits_spot_idToext_spotsInput
  }

  export type ext_spotsUncheckedCreateWithoutSpot_guidesInput = {
    id: string
    source_type: $Enums.ext_spots_source_type
    title: string
    image_url: string
    landmark_latitude: number
    landmark_longitude: number
    is_recommendable: boolean
    created_at?: Date | string
    lock_no?: number
    spot_visits_spot_visits_prev_spot_idToext_spots?: spot_visitsUncheckedCreateNestedManyWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput
    spot_visits_spot_visits_spot_idToext_spots?: spot_visitsUncheckedCreateNestedManyWithoutExt_spots_spot_visits_spot_idToext_spotsInput
  }

  export type ext_spotsCreateOrConnectWithoutSpot_guidesInput = {
    where: ext_spotsWhereUniqueInput
    create: XOR<ext_spotsCreateWithoutSpot_guidesInput, ext_spotsUncheckedCreateWithoutSpot_guidesInput>
  }

  export type spot_visitsCreateWithoutSpot_guidesInput = {
    id: string
    user_id: string
    taken_photo_storage_path?: string | null
    time_gap_minutes: number
    min_version_major: number
    max_version_major: number
    created_at?: Date | string
    updated_at?: Date | string
    lock_no?: number
    ext_spots_spot_visits_prev_spot_idToext_spots?: ext_spotsCreateNestedOneWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput
    ext_spots_spot_visits_spot_idToext_spots: ext_spotsCreateNestedOneWithoutSpot_visits_spot_visits_spot_idToext_spotsInput
  }

  export type spot_visitsUncheckedCreateWithoutSpot_guidesInput = {
    id: string
    user_id: string
    spot_id: string
    taken_photo_storage_path?: string | null
    prev_spot_id?: string | null
    time_gap_minutes: number
    min_version_major: number
    max_version_major: number
    created_at?: Date | string
    updated_at?: Date | string
    lock_no?: number
  }

  export type spot_visitsCreateOrConnectWithoutSpot_guidesInput = {
    where: spot_visitsWhereUniqueInput
    create: XOR<spot_visitsCreateWithoutSpot_guidesInput, spot_visitsUncheckedCreateWithoutSpot_guidesInput>
  }

  export type spot_visitsCreateManySpot_guidesInputEnvelope = {
    data: spot_visitsCreateManySpot_guidesInput | spot_visitsCreateManySpot_guidesInput[]
    skipDuplicates?: boolean
  }

  export type ext_spotsUpsertWithoutSpot_guidesInput = {
    update: XOR<ext_spotsUpdateWithoutSpot_guidesInput, ext_spotsUncheckedUpdateWithoutSpot_guidesInput>
    create: XOR<ext_spotsCreateWithoutSpot_guidesInput, ext_spotsUncheckedCreateWithoutSpot_guidesInput>
    where?: ext_spotsWhereInput
  }

  export type ext_spotsUpdateToOneWithWhereWithoutSpot_guidesInput = {
    where?: ext_spotsWhereInput
    data: XOR<ext_spotsUpdateWithoutSpot_guidesInput, ext_spotsUncheckedUpdateWithoutSpot_guidesInput>
  }

  export type ext_spotsUpdateWithoutSpot_guidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    source_type?: Enumext_spots_source_typeFieldUpdateOperationsInput | $Enums.ext_spots_source_type
    title?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    landmark_latitude?: FloatFieldUpdateOperationsInput | number
    landmark_longitude?: FloatFieldUpdateOperationsInput | number
    is_recommendable?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
    spot_visits_spot_visits_prev_spot_idToext_spots?: spot_visitsUpdateManyWithoutExt_spots_spot_visits_prev_spot_idToext_spotsNestedInput
    spot_visits_spot_visits_spot_idToext_spots?: spot_visitsUpdateManyWithoutExt_spots_spot_visits_spot_idToext_spotsNestedInput
  }

  export type ext_spotsUncheckedUpdateWithoutSpot_guidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    source_type?: Enumext_spots_source_typeFieldUpdateOperationsInput | $Enums.ext_spots_source_type
    title?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    landmark_latitude?: FloatFieldUpdateOperationsInput | number
    landmark_longitude?: FloatFieldUpdateOperationsInput | number
    is_recommendable?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
    spot_visits_spot_visits_prev_spot_idToext_spots?: spot_visitsUncheckedUpdateManyWithoutExt_spots_spot_visits_prev_spot_idToext_spotsNestedInput
    spot_visits_spot_visits_spot_idToext_spots?: spot_visitsUncheckedUpdateManyWithoutExt_spots_spot_visits_spot_idToext_spotsNestedInput
  }

  export type spot_visitsUpsertWithWhereUniqueWithoutSpot_guidesInput = {
    where: spot_visitsWhereUniqueInput
    update: XOR<spot_visitsUpdateWithoutSpot_guidesInput, spot_visitsUncheckedUpdateWithoutSpot_guidesInput>
    create: XOR<spot_visitsCreateWithoutSpot_guidesInput, spot_visitsUncheckedCreateWithoutSpot_guidesInput>
  }

  export type spot_visitsUpdateWithWhereUniqueWithoutSpot_guidesInput = {
    where: spot_visitsWhereUniqueInput
    data: XOR<spot_visitsUpdateWithoutSpot_guidesInput, spot_visitsUncheckedUpdateWithoutSpot_guidesInput>
  }

  export type spot_visitsUpdateManyWithWhereWithoutSpot_guidesInput = {
    where: spot_visitsScalarWhereInput
    data: XOR<spot_visitsUpdateManyMutationInput, spot_visitsUncheckedUpdateManyWithoutSpot_guidesInput>
  }

  export type ext_spotsCreateWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput = {
    id: string
    source_type: $Enums.ext_spots_source_type
    title: string
    image_url: string
    landmark_latitude: number
    landmark_longitude: number
    is_recommendable: boolean
    created_at?: Date | string
    lock_no?: number
    spot_guides?: spot_guidesCreateNestedManyWithoutExt_spotsInput
    spot_visits_spot_visits_spot_idToext_spots?: spot_visitsCreateNestedManyWithoutExt_spots_spot_visits_spot_idToext_spotsInput
  }

  export type ext_spotsUncheckedCreateWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput = {
    id: string
    source_type: $Enums.ext_spots_source_type
    title: string
    image_url: string
    landmark_latitude: number
    landmark_longitude: number
    is_recommendable: boolean
    created_at?: Date | string
    lock_no?: number
    spot_guides?: spot_guidesUncheckedCreateNestedManyWithoutExt_spotsInput
    spot_visits_spot_visits_spot_idToext_spots?: spot_visitsUncheckedCreateNestedManyWithoutExt_spots_spot_visits_spot_idToext_spotsInput
  }

  export type ext_spotsCreateOrConnectWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput = {
    where: ext_spotsWhereUniqueInput
    create: XOR<ext_spotsCreateWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput, ext_spotsUncheckedCreateWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput>
  }

  export type spot_guidesCreateWithoutSpot_visitsInput = {
    id: string
    lang: string
    title: string
    manuscript: string
    audio_storage_path: string
    voice_type: $Enums.spot_guides_voice_type
    tags?: spot_guidesCreatetagsInput | string[]
    price_amount: Decimal | DecimalJsLike | number | string
    currency: string
    recommendation_weight: number
    min_version_major: number
    max_version_major: number
    created_by: string
    created_at?: Date | string
    created_request_id: string
    lock_no?: number
    ext_spots: ext_spotsCreateNestedOneWithoutSpot_guidesInput
  }

  export type spot_guidesUncheckedCreateWithoutSpot_visitsInput = {
    id: string
    spot_id: string
    lang: string
    title: string
    manuscript: string
    audio_storage_path: string
    voice_type: $Enums.spot_guides_voice_type
    tags?: spot_guidesCreatetagsInput | string[]
    price_amount: Decimal | DecimalJsLike | number | string
    currency: string
    recommendation_weight: number
    min_version_major: number
    max_version_major: number
    created_by: string
    created_at?: Date | string
    created_request_id: string
    lock_no?: number
  }

  export type spot_guidesCreateOrConnectWithoutSpot_visitsInput = {
    where: spot_guidesWhereUniqueInput
    create: XOR<spot_guidesCreateWithoutSpot_visitsInput, spot_guidesUncheckedCreateWithoutSpot_visitsInput>
  }

  export type ext_spotsCreateWithoutSpot_visits_spot_visits_spot_idToext_spotsInput = {
    id: string
    source_type: $Enums.ext_spots_source_type
    title: string
    image_url: string
    landmark_latitude: number
    landmark_longitude: number
    is_recommendable: boolean
    created_at?: Date | string
    lock_no?: number
    spot_guides?: spot_guidesCreateNestedManyWithoutExt_spotsInput
    spot_visits_spot_visits_prev_spot_idToext_spots?: spot_visitsCreateNestedManyWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput
  }

  export type ext_spotsUncheckedCreateWithoutSpot_visits_spot_visits_spot_idToext_spotsInput = {
    id: string
    source_type: $Enums.ext_spots_source_type
    title: string
    image_url: string
    landmark_latitude: number
    landmark_longitude: number
    is_recommendable: boolean
    created_at?: Date | string
    lock_no?: number
    spot_guides?: spot_guidesUncheckedCreateNestedManyWithoutExt_spotsInput
    spot_visits_spot_visits_prev_spot_idToext_spots?: spot_visitsUncheckedCreateNestedManyWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput
  }

  export type ext_spotsCreateOrConnectWithoutSpot_visits_spot_visits_spot_idToext_spotsInput = {
    where: ext_spotsWhereUniqueInput
    create: XOR<ext_spotsCreateWithoutSpot_visits_spot_visits_spot_idToext_spotsInput, ext_spotsUncheckedCreateWithoutSpot_visits_spot_visits_spot_idToext_spotsInput>
  }

  export type ext_spotsUpsertWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput = {
    update: XOR<ext_spotsUpdateWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput, ext_spotsUncheckedUpdateWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput>
    create: XOR<ext_spotsCreateWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput, ext_spotsUncheckedCreateWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput>
    where?: ext_spotsWhereInput
  }

  export type ext_spotsUpdateToOneWithWhereWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput = {
    where?: ext_spotsWhereInput
    data: XOR<ext_spotsUpdateWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput, ext_spotsUncheckedUpdateWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput>
  }

  export type ext_spotsUpdateWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    source_type?: Enumext_spots_source_typeFieldUpdateOperationsInput | $Enums.ext_spots_source_type
    title?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    landmark_latitude?: FloatFieldUpdateOperationsInput | number
    landmark_longitude?: FloatFieldUpdateOperationsInput | number
    is_recommendable?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
    spot_guides?: spot_guidesUpdateManyWithoutExt_spotsNestedInput
    spot_visits_spot_visits_spot_idToext_spots?: spot_visitsUpdateManyWithoutExt_spots_spot_visits_spot_idToext_spotsNestedInput
  }

  export type ext_spotsUncheckedUpdateWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    source_type?: Enumext_spots_source_typeFieldUpdateOperationsInput | $Enums.ext_spots_source_type
    title?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    landmark_latitude?: FloatFieldUpdateOperationsInput | number
    landmark_longitude?: FloatFieldUpdateOperationsInput | number
    is_recommendable?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
    spot_guides?: spot_guidesUncheckedUpdateManyWithoutExt_spotsNestedInput
    spot_visits_spot_visits_spot_idToext_spots?: spot_visitsUncheckedUpdateManyWithoutExt_spots_spot_visits_spot_idToext_spotsNestedInput
  }

  export type spot_guidesUpsertWithoutSpot_visitsInput = {
    update: XOR<spot_guidesUpdateWithoutSpot_visitsInput, spot_guidesUncheckedUpdateWithoutSpot_visitsInput>
    create: XOR<spot_guidesCreateWithoutSpot_visitsInput, spot_guidesUncheckedCreateWithoutSpot_visitsInput>
    where?: spot_guidesWhereInput
  }

  export type spot_guidesUpdateToOneWithWhereWithoutSpot_visitsInput = {
    where?: spot_guidesWhereInput
    data: XOR<spot_guidesUpdateWithoutSpot_visitsInput, spot_guidesUncheckedUpdateWithoutSpot_visitsInput>
  }

  export type spot_guidesUpdateWithoutSpot_visitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    lang?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    manuscript?: StringFieldUpdateOperationsInput | string
    audio_storage_path?: StringFieldUpdateOperationsInput | string
    voice_type?: Enumspot_guides_voice_typeFieldUpdateOperationsInput | $Enums.spot_guides_voice_type
    tags?: spot_guidesUpdatetagsInput | string[]
    price_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    recommendation_weight?: IntFieldUpdateOperationsInput | number
    min_version_major?: IntFieldUpdateOperationsInput | number
    max_version_major?: IntFieldUpdateOperationsInput | number
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_request_id?: StringFieldUpdateOperationsInput | string
    lock_no?: IntFieldUpdateOperationsInput | number
    ext_spots?: ext_spotsUpdateOneRequiredWithoutSpot_guidesNestedInput
  }

  export type spot_guidesUncheckedUpdateWithoutSpot_visitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    spot_id?: StringFieldUpdateOperationsInput | string
    lang?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    manuscript?: StringFieldUpdateOperationsInput | string
    audio_storage_path?: StringFieldUpdateOperationsInput | string
    voice_type?: Enumspot_guides_voice_typeFieldUpdateOperationsInput | $Enums.spot_guides_voice_type
    tags?: spot_guidesUpdatetagsInput | string[]
    price_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    recommendation_weight?: IntFieldUpdateOperationsInput | number
    min_version_major?: IntFieldUpdateOperationsInput | number
    max_version_major?: IntFieldUpdateOperationsInput | number
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_request_id?: StringFieldUpdateOperationsInput | string
    lock_no?: IntFieldUpdateOperationsInput | number
  }

  export type ext_spotsUpsertWithoutSpot_visits_spot_visits_spot_idToext_spotsInput = {
    update: XOR<ext_spotsUpdateWithoutSpot_visits_spot_visits_spot_idToext_spotsInput, ext_spotsUncheckedUpdateWithoutSpot_visits_spot_visits_spot_idToext_spotsInput>
    create: XOR<ext_spotsCreateWithoutSpot_visits_spot_visits_spot_idToext_spotsInput, ext_spotsUncheckedCreateWithoutSpot_visits_spot_visits_spot_idToext_spotsInput>
    where?: ext_spotsWhereInput
  }

  export type ext_spotsUpdateToOneWithWhereWithoutSpot_visits_spot_visits_spot_idToext_spotsInput = {
    where?: ext_spotsWhereInput
    data: XOR<ext_spotsUpdateWithoutSpot_visits_spot_visits_spot_idToext_spotsInput, ext_spotsUncheckedUpdateWithoutSpot_visits_spot_visits_spot_idToext_spotsInput>
  }

  export type ext_spotsUpdateWithoutSpot_visits_spot_visits_spot_idToext_spotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    source_type?: Enumext_spots_source_typeFieldUpdateOperationsInput | $Enums.ext_spots_source_type
    title?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    landmark_latitude?: FloatFieldUpdateOperationsInput | number
    landmark_longitude?: FloatFieldUpdateOperationsInput | number
    is_recommendable?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
    spot_guides?: spot_guidesUpdateManyWithoutExt_spotsNestedInput
    spot_visits_spot_visits_prev_spot_idToext_spots?: spot_visitsUpdateManyWithoutExt_spots_spot_visits_prev_spot_idToext_spotsNestedInput
  }

  export type ext_spotsUncheckedUpdateWithoutSpot_visits_spot_visits_spot_idToext_spotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    source_type?: Enumext_spots_source_typeFieldUpdateOperationsInput | $Enums.ext_spots_source_type
    title?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    landmark_latitude?: FloatFieldUpdateOperationsInput | number
    landmark_longitude?: FloatFieldUpdateOperationsInput | number
    is_recommendable?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
    spot_guides?: spot_guidesUncheckedUpdateManyWithoutExt_spotsNestedInput
    spot_visits_spot_visits_prev_spot_idToext_spots?: spot_visitsUncheckedUpdateManyWithoutExt_spots_spot_visits_prev_spot_idToext_spotsNestedInput
  }

  export type spot_guidesCreateManyExt_spotsInput = {
    id: string
    lang: string
    title: string
    manuscript: string
    audio_storage_path: string
    voice_type: $Enums.spot_guides_voice_type
    tags?: spot_guidesCreatetagsInput | string[]
    price_amount: Decimal | DecimalJsLike | number | string
    currency: string
    recommendation_weight: number
    min_version_major: number
    max_version_major: number
    created_by: string
    created_at?: Date | string
    created_request_id: string
    lock_no?: number
  }

  export type spot_visitsCreateManyExt_spots_spot_visits_prev_spot_idToext_spotsInput = {
    id: string
    user_id: string
    spot_id: string
    represent_guide_id: string
    taken_photo_storage_path?: string | null
    time_gap_minutes: number
    min_version_major: number
    max_version_major: number
    created_at?: Date | string
    updated_at?: Date | string
    lock_no?: number
  }

  export type spot_visitsCreateManyExt_spots_spot_visits_spot_idToext_spotsInput = {
    id: string
    user_id: string
    represent_guide_id: string
    taken_photo_storage_path?: string | null
    prev_spot_id?: string | null
    time_gap_minutes: number
    min_version_major: number
    max_version_major: number
    created_at?: Date | string
    updated_at?: Date | string
    lock_no?: number
  }

  export type spot_guidesUpdateWithoutExt_spotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    lang?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    manuscript?: StringFieldUpdateOperationsInput | string
    audio_storage_path?: StringFieldUpdateOperationsInput | string
    voice_type?: Enumspot_guides_voice_typeFieldUpdateOperationsInput | $Enums.spot_guides_voice_type
    tags?: spot_guidesUpdatetagsInput | string[]
    price_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    recommendation_weight?: IntFieldUpdateOperationsInput | number
    min_version_major?: IntFieldUpdateOperationsInput | number
    max_version_major?: IntFieldUpdateOperationsInput | number
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_request_id?: StringFieldUpdateOperationsInput | string
    lock_no?: IntFieldUpdateOperationsInput | number
    spot_visits?: spot_visitsUpdateManyWithoutSpot_guidesNestedInput
  }

  export type spot_guidesUncheckedUpdateWithoutExt_spotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    lang?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    manuscript?: StringFieldUpdateOperationsInput | string
    audio_storage_path?: StringFieldUpdateOperationsInput | string
    voice_type?: Enumspot_guides_voice_typeFieldUpdateOperationsInput | $Enums.spot_guides_voice_type
    tags?: spot_guidesUpdatetagsInput | string[]
    price_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    recommendation_weight?: IntFieldUpdateOperationsInput | number
    min_version_major?: IntFieldUpdateOperationsInput | number
    max_version_major?: IntFieldUpdateOperationsInput | number
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_request_id?: StringFieldUpdateOperationsInput | string
    lock_no?: IntFieldUpdateOperationsInput | number
    spot_visits?: spot_visitsUncheckedUpdateManyWithoutSpot_guidesNestedInput
  }

  export type spot_guidesUncheckedUpdateManyWithoutExt_spotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    lang?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    manuscript?: StringFieldUpdateOperationsInput | string
    audio_storage_path?: StringFieldUpdateOperationsInput | string
    voice_type?: Enumspot_guides_voice_typeFieldUpdateOperationsInput | $Enums.spot_guides_voice_type
    tags?: spot_guidesUpdatetagsInput | string[]
    price_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    recommendation_weight?: IntFieldUpdateOperationsInput | number
    min_version_major?: IntFieldUpdateOperationsInput | number
    max_version_major?: IntFieldUpdateOperationsInput | number
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_request_id?: StringFieldUpdateOperationsInput | string
    lock_no?: IntFieldUpdateOperationsInput | number
  }

  export type spot_visitsUpdateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    taken_photo_storage_path?: NullableStringFieldUpdateOperationsInput | string | null
    time_gap_minutes?: IntFieldUpdateOperationsInput | number
    min_version_major?: IntFieldUpdateOperationsInput | number
    max_version_major?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
    spot_guides?: spot_guidesUpdateOneRequiredWithoutSpot_visitsNestedInput
    ext_spots_spot_visits_spot_idToext_spots?: ext_spotsUpdateOneRequiredWithoutSpot_visits_spot_visits_spot_idToext_spotsNestedInput
  }

  export type spot_visitsUncheckedUpdateWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    spot_id?: StringFieldUpdateOperationsInput | string
    represent_guide_id?: StringFieldUpdateOperationsInput | string
    taken_photo_storage_path?: NullableStringFieldUpdateOperationsInput | string | null
    time_gap_minutes?: IntFieldUpdateOperationsInput | number
    min_version_major?: IntFieldUpdateOperationsInput | number
    max_version_major?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
  }

  export type spot_visitsUncheckedUpdateManyWithoutExt_spots_spot_visits_prev_spot_idToext_spotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    spot_id?: StringFieldUpdateOperationsInput | string
    represent_guide_id?: StringFieldUpdateOperationsInput | string
    taken_photo_storage_path?: NullableStringFieldUpdateOperationsInput | string | null
    time_gap_minutes?: IntFieldUpdateOperationsInput | number
    min_version_major?: IntFieldUpdateOperationsInput | number
    max_version_major?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
  }

  export type spot_visitsUpdateWithoutExt_spots_spot_visits_spot_idToext_spotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    taken_photo_storage_path?: NullableStringFieldUpdateOperationsInput | string | null
    time_gap_minutes?: IntFieldUpdateOperationsInput | number
    min_version_major?: IntFieldUpdateOperationsInput | number
    max_version_major?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
    ext_spots_spot_visits_prev_spot_idToext_spots?: ext_spotsUpdateOneWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsNestedInput
    spot_guides?: spot_guidesUpdateOneRequiredWithoutSpot_visitsNestedInput
  }

  export type spot_visitsUncheckedUpdateWithoutExt_spots_spot_visits_spot_idToext_spotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    represent_guide_id?: StringFieldUpdateOperationsInput | string
    taken_photo_storage_path?: NullableStringFieldUpdateOperationsInput | string | null
    prev_spot_id?: NullableStringFieldUpdateOperationsInput | string | null
    time_gap_minutes?: IntFieldUpdateOperationsInput | number
    min_version_major?: IntFieldUpdateOperationsInput | number
    max_version_major?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
  }

  export type spot_visitsUncheckedUpdateManyWithoutExt_spots_spot_visits_spot_idToext_spotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    represent_guide_id?: StringFieldUpdateOperationsInput | string
    taken_photo_storage_path?: NullableStringFieldUpdateOperationsInput | string | null
    prev_spot_id?: NullableStringFieldUpdateOperationsInput | string | null
    time_gap_minutes?: IntFieldUpdateOperationsInput | number
    min_version_major?: IntFieldUpdateOperationsInput | number
    max_version_major?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
  }

  export type spot_visitsCreateManySpot_guidesInput = {
    id: string
    user_id: string
    spot_id: string
    taken_photo_storage_path?: string | null
    prev_spot_id?: string | null
    time_gap_minutes: number
    min_version_major: number
    max_version_major: number
    created_at?: Date | string
    updated_at?: Date | string
    lock_no?: number
  }

  export type spot_visitsUpdateWithoutSpot_guidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    taken_photo_storage_path?: NullableStringFieldUpdateOperationsInput | string | null
    time_gap_minutes?: IntFieldUpdateOperationsInput | number
    min_version_major?: IntFieldUpdateOperationsInput | number
    max_version_major?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
    ext_spots_spot_visits_prev_spot_idToext_spots?: ext_spotsUpdateOneWithoutSpot_visits_spot_visits_prev_spot_idToext_spotsNestedInput
    ext_spots_spot_visits_spot_idToext_spots?: ext_spotsUpdateOneRequiredWithoutSpot_visits_spot_visits_spot_idToext_spotsNestedInput
  }

  export type spot_visitsUncheckedUpdateWithoutSpot_guidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    spot_id?: StringFieldUpdateOperationsInput | string
    taken_photo_storage_path?: NullableStringFieldUpdateOperationsInput | string | null
    prev_spot_id?: NullableStringFieldUpdateOperationsInput | string | null
    time_gap_minutes?: IntFieldUpdateOperationsInput | number
    min_version_major?: IntFieldUpdateOperationsInput | number
    max_version_major?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
  }

  export type spot_visitsUncheckedUpdateManyWithoutSpot_guidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    spot_id?: StringFieldUpdateOperationsInput | string
    taken_photo_storage_path?: NullableStringFieldUpdateOperationsInput | string | null
    prev_spot_id?: NullableStringFieldUpdateOperationsInput | string | null
    time_gap_minutes?: IntFieldUpdateOperationsInput | number
    min_version_major?: IntFieldUpdateOperationsInput | number
    max_version_major?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    lock_no?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}