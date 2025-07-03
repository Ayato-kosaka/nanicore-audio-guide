import { MaterialCommunityIcons } from "@expo/vector-icons";

/** Google Place の type 文字列。必要なら union 型で絞っても OK */
type PlaceType = string;
/** icon 名 = glyphMap のキー。型安全にしておくと拡張が楽 */
type MCIName = keyof typeof MaterialCommunityIcons.glyphMap;

/**
 * Google Place prediction の type(s) から最適な MCI 名を返す。
 *
 * @param types - Prediction.types（単一文字列でも配列でも可）
 * @returns     - MaterialCommunityIcons の glyph 名
 *
 * アルゴリズム
 *  1. Table B（汎用タイプ）に厳密一致するものがあれば、それを最優先で返す
 *  2. Table A（固有タイプ）に厳密一致するものがあれば返す
 *  3. パターン（正規表現）にマッチするものがあれば返す
 *  4. Table A のカテゴリ情報から対応アイコンを返す
 *  5. 上記すべてに該当しない場合は 'map-marker' を返す（デフォルト）
 */
export function convertGooglePlacePredictionTypeToMaterialCommunityIcon(types: PlaceType | PlaceType[]): MCIName {
	const tArr = Array.isArray(types) ? types : [types];

	// Table B の type 候補一覧
	const TABLE_B_TYPES: Set<PlaceType> = new Set([
		"establishment",
		"finance",
		"food",
		"general_contractor",
		"geocode",
		"health",
		"intersection",
		"landmark",
		"natural_feature",
		"neighborhood",
		"place_of_worship",
		"point_of_interest",
		"political",
		"premise",
		"route",
		"street_address",
		"town_square",
		"plus_code",
	]);

	// 1️⃣ Table B（汎用タイプ）から優先して厳密一致チェック
	for (const t of tArr) {
		if (TABLE_B_TYPES.has(t)) {
			const exactB = TYPE_ICON_MAP[t];
			if (exactB) return exactB;
		}
	}

	// 2️⃣ Table A（残りのタイプ）で厳密一致チェック
	for (const t of tArr) {
		if (!TABLE_B_TYPES.has(t)) {
			const exactA = TYPE_ICON_MAP[t];
			if (exactA) return exactA;
		}
	}

	// 3️⃣ パターン一致
	for (const t of tArr) {
		for (const [pattern, icon] of PATTERN_ICON_MAP) {
			if (pattern.test(t)) return icon;
		}
	}

	// 4️⃣ カテゴリ fallback
	for (const t of tArr) {
		const cat = CATEGORY_BY_TYPE[t];
		if (cat) {
			const icon = CATEGORY_ICON_MAP[cat];
			if (icon) return icon;
		}
	}

	// 5️⃣ 最終デフォルト
	return "map-marker";
}

/* ------------------------------------------------------------------ */
/*  ↓↓↓ 以下は──必要に応じて拡張・自動生成できる定数セクション ──  */
/* ------------------------------------------------------------------ */

/** 1️⃣、2️⃣ Table A/B の各 type → MCI 名（厳密一致） */
const TYPE_ICON_MAP: Record<PlaceType, MCIName> = {
	/* ▶ Automotive */
	car_dealer: "car-sports",
	car_rental: "car-clock",
	car_repair: "car-wrench",
	car_wash: "car-wash",
	electric_vehicle_charging_station: "ev-station",
	gas_station: "gas-station",
	parking: "parking",
	rest_stop: "car-brake-parking",

	/* ▶ Business */
	corporate_office: "office-building-cog",
	farm: "tractor",
	ranch: "cow",

	/* ▶ Culture */
	art_gallery: "palette",
	art_studio: "palette-outline",
	auditorium: "stadium-variant",
	cultural_landmark: "bank",
	historical_place: "castle",
	monument: "pillar",
	museum: "bank",
	performing_arts_theater: "drama-masks",
	sculpture: "shape",

	/* ▶ Education */
	library: "library",
	preschool: "face-woman",
	primary_school: "school",
	secondary_school: "school-outline",
	university: "school",

	/* ▶ Entertainment & Recreation */
	adventure_sports_center: "parachute",
	amphitheatre: "stadium",
	amusement_center: "robot-happy",
	amusement_park: "roller-skate",
	aquarium: "fishbowl",
	banquet_hall: "silverware-fork-knife",
	bar: "glass-cocktail",
	bar_and_grill: "grill",
	bowling_alley: "bowling",
	casino: "cards-playing",
	childrens_camp: "campfire",
	comedy_club: "drama-masks",
	community_center: "account-group",
	concert_hall: "music-circle",
	convention_center: "account-group",
	cultural_center: "bank",
	dog_park: "dog",
	event_venue: "calendar-star",
	ferris_wheel: "ferris-wheel",
	garden: "flower",
	hiking_area: "hiking",
	historical_landmark: "castle",
	internet_cafe: "wifi",
	karaoke: "microphone-variant",
	marina: "sail-boat",
	movie_theater: "movie-open",
	national_park: "pine-tree",
	night_club: "music-note",
	park: "pine-tree",
	picnic_ground: "table-picnic",
	planetarium: "telescope",
	plaza: "town-hall",
	roller_coaster: "roller-skate",
	skateboard_park: "skateboard",
	state_park: "tree",
	tourist_attraction: "camera-account",
	video_arcade: "controller-classic",
	visitor_center: "information",
	water_park: "water",
	wedding_venue: "ring",
	wildlife_park: "paw",
	wildlife_refuge: "paw",
	zoo: "elephant",

	/* ▶ Facilities */
	public_bath: "toilet",
	public_bathroom: "toilet",
	stable: "horse-variant",

	/* ▶ Finance */
	accounting: "calculator",
	atm: "cash",
	bank: "bank",

	/* ▶ Food & Drink  ※「X_restaurant」「X_shop」などはパターンで吸収するので代表だけ */
	bakery: "bread-slice",
	//   bar_and_grill: 'grill',
	cafe: "coffee",
	coffee_shop: "coffee",
	fast_food_restaurant: "hamburger",
	ice_cream_shop: "ice-cream",
	meal_delivery: "truck-delivery",
	meal_takeaway: "silverware-fork-knife",
	pizza_restaurant: "pizza",
	restaurant: "silverware-fork-knife",
	sushi_restaurant: "food",
	wine_bar: "glass-wine",

	/* ▶ Geographical Areas */
	country: "flag",
	administrative_area_level_1: "flag-variant",
	administrative_area_level_2: "flag-variant-outline",
	locality: "city-variant",
	postal_code: "mailbox",

	/* ▶ Government */
	city_hall: "town-hall",
	courthouse: "scale-balance",
	embassy: "flag",
	fire_station: "fire-truck",
	government_office: "account-tie",
	police: "police-badge",
	post_office: "email",

	/* ▶ Health & Wellness */
	chiropractor: "human-handsup",
	dental_clinic: "tooth-outline",
	dentist: "tooth",
	doctor: "stethoscope",
	drugstore: "pill",
	hospital: "hospital-building",
	massage: "hand-heart",
	medical_lab: "microscope",
	pharmacy: "pill",
	physiotherapist: "run",
	sauna: "hot-tub",
	spa: "spa",
	wellness_center: "spa",
	yoga_studio: "yoga",

	/* ▶ Housing */
	apartment_building: "office-building",
	apartment_complex: "office-building-marker",
	condominium_complex: "home-group",
	housing_complex: "home-group",

	/* ▶ Lodging */
	bed_and_breakfast: "bed",
	campground: "tent",
	camping_cabin: "cabin-a-frame",
	hostel: "bed-king-outline",
	hotel: "bed",
	lodging: "bed",
	motel: "bed",
	resort_hotel: "beach",
	rv_park: "caravan",

	/* ▶ Natural Features */
	beach: "beach",

	/* ▶ Places of Worship */
	church: "church",
	hindu_temple: "bank",
	mosque: "mosque",
	synagogue: "church",

	/* ▶ Services */
	barber_shop: "content-cut",
	beauty_salon: "face-woman-outline",
	cemetery: "coffin",
	child_care_agency: "baby-face",
	consultant: "account-tie",
	courier_service: "truck-fast",
	electrician: "flash",
	florist: "flower",
	funeral_home: "coffin",
	hair_salon: "hair-dryer",
	insurance_agency: "shield-account",
	laundry: "washing-machine",
	lawyer: "gavel",
	locksmith: "lock",
	moving_company: "truck",
	nail_salon: "hand-back-left",
	painter: "format-paint",
	plumber: "pipe-wrench",
	real_estate_agency: "home",
	roofing_contractor: "home-roof",
	storage: "warehouse",
	tailor: "tape-measure",
	telecommunications_service_provider: "lan",
	travel_agency: "map",
	veterinary_care: "paw",

	/* ▶ Shopping */
	auto_parts_store: "car-cog",
	bicycle_store: "bicycle",
	book_store: "book-open-variant",
	butcher_shop: "food-steak",
	cell_phone_store: "cellphone",
	clothing_store: "tshirt-crew",
	convenience_store: "store",
	department_store: "store-outline",
	electronics_store: "laptop",
	furniture_store: "sofa",
	gift_shop: "gift",
	grocery_store: "basket",
	hardware_store: "hammer",
	home_goods_store: "sofa",
	jewelry_store: "diamond-stone",
	liquor_store: "glass-wine",
	market: "basket",
	pet_store: "dog",
	shoe_store: "shoe-sneaker",
	shopping_mall: "shopping",
	sporting_goods_store: "basketball",
	supermarket: "cart",
	warehouse_store: "warehouse",
	wholesaler: "truck-delivery",

	/* ▶ Sports */
	arena: "stadium",
	athletic_field: "soccer-field",
	fishing_charter: "fish",
	fishing_pond: "fish",
	fitness_center: "dumbbell",
	golf_course: "golf",
	gym: "dumbbell",
	ice_skating_rink: "skate",
	playground: "basketball",
	ski_resort: "ski",
	sports_club: "basketball",
	sports_complex: "stadium-variant",
	stadium: "stadium",
	swimming_pool: "pool",

	/* ▶ Transportation */
	airport: "airplane",
	airstrip: "airplane-landing",
	bus_station: "bus",
	bus_stop: "bus-stop",
	ferry_terminal: "ferry",
	heliport: "helicopter",
	international_airport: "airplane",
	light_rail_station: "train",
	park_and_ride: "parking",
	subway_station: "subway-variant",
	taxi_stand: "taxi",
	train_station: "train",
	transit_station: "train-variant",
	transit_depot: "train-car",
	truck_stop: "truck",

	/* ▶ 追加タイプ (Table B) */
	establishment: "office-building",
	finance: "cash-multiple",
	food: "food",
	general_contractor: "hammer-wrench",
	geocode: "map-marker",
	health: "heart-pulse",
	intersection: "road-variant",
	landmark: "bank",
	natural_feature: "forest",
	neighborhood: "home-group",
	place_of_worship: "church",
	point_of_interest: "map-marker-star",
	political: "flag",
	premise: "home",
	route: "road",
	street_address: "home-map-marker",
	town_square: "town-hall",
	plus_code: "map-marker-plus",
} as const;

/** 3️⃣ 名前パターン → アイコン名 */
const PATTERN_ICON_MAP: Array<[RegExp, MCIName]> = [
	[/restaurant|_restaurant$/, "silverware-fork-knife"],
	[/_shop$|_store$/, "store"],
	[/_camp$/, "campfire"],
	[/_park$/, "tree"],
	[/_cafe$/, "coffee"],
	[/(doctor|dentist)/, "stethoscope"],
	[/school|university/, "school"],
	[/hotel|lodging|motel|hostel|resort/, "bed"],
	[/airport|airstrip/, "airplane"],
	[/bus_|bus_|_station|bus-stop/, "bus"],
	[/train_|subway_|rail/, "train"],
	[/(car_|auto_|gas_|parking)/, "car"],
	[/(beauty|salon|spa)/, "face-woman-outline"],
	[/bank|finance|atm/, "bank"],
	[/museum|art|gallery/, "palette"],
];

/** 4️⃣ Table A のカテゴリ → アイコン   */
type Category =
	| "Automotive"
	| "Business"
	| "Culture"
	| "Education"
	| "Entertainment and Recreation"
	| "Facilities"
	| "Finance"
	| "Food and Drink"
	| "Geographical Areas"
	| "Government"
	| "Health and Wellness"
	| "Housing"
	| "Lodging"
	| "Natural Features"
	| "Places of Worship"
	| "Services"
	| "Shopping"
	| "Sports"
	| "Transportation";

const CATEGORY_ICON_MAP: Record<Category, MCIName> = {
	Automotive: "car",
	Business: "briefcase",
	Culture: "bank",
	Education: "school",
	"Entertainment and Recreation": "gamepad-variant",
	Facilities: "office-building",
	Finance: "bank",
	"Food and Drink": "food",
	"Geographical Areas": "map-marker-radius",
	Government: "town-hall",
	"Health and Wellness": "heart-pulse",
	Housing: "home-city",
	Lodging: "bed",
	"Natural Features": "pine-tree",
	"Places of Worship": "church",
	Services: "account-wrench",
	Shopping: "shopping",
	Sports: "basketball",
	Transportation: "bus",
};

/** 4️⃣-補足 type → カテゴリ   ※頻出のみ、足りなければ随時追加 */
const CATEGORY_BY_TYPE: Record<PlaceType, Category> = {
	car_dealer: "Automotive",
	car_rental: "Automotive",
	gas_station: "Automotive",
	parking: "Automotive",
	bank: "Finance",
	atm: "Finance",
	restaurant: "Food and Drink",
	cafe: "Food and Drink",
	bar: "Food and Drink",
	bakery: "Food and Drink",
	library: "Education",
	school: "Education",
	university: "Education",
	hospital: "Health and Wellness",
	pharmacy: "Health and Wellness",
	zoo: "Entertainment and Recreation",
	museum: "Culture",
	park: "Entertainment and Recreation",
	airport: "Transportation",
	bus_station: "Transportation",
	train_station: "Transportation",
	lodging: "Lodging",
	hotel: "Lodging",
	supermarket: "Shopping",
	store: "Shopping",
	police: "Government",
	fire_station: "Government",
	country: "Geographical Areas",
	administrative_area_level_1: "Geographical Areas",
	locality: "Geographical Areas",
} as const;
