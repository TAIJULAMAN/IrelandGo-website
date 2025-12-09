export type PopularPlace = {
    name: string;
    image: string;
};

export type IrishSettlement = {
    id: number;
    name: string;
    county: string;
    province: string;
    type: string;
    lat: number;
    lng: number;
    popularPlaces: PopularPlace[];
};

export const irishSettlements: IrishSettlement[] = [
    {
        id: 1,
        name: "Dublin",
        county: "Dublin",
        province: "Leinster",
        type: "City",
        lat: 53.3498,
        lng: -6.2603,
        popularPlaces: [
            { name: "Guinness Storehouse", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Guinness_Storehouse_Gravity_Bar_View.jpg/800px-Guinness_Storehouse_Gravity_Bar_View.jpg" },
            { name: "Trinity College", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Trinity_College_Dublin_Campanile_2.jpg/800px-Trinity_College_Dublin_Campanile_2.jpg" },
            { name: "Temple Bar", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Temple_Bar%2C_Dublin.jpg/800px-Temple_Bar%2C_Dublin.jpg" },
            { name: "Phoenix Park", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Phoenix_Park_Monument.jpg/800px-Phoenix_Park_Monument.jpg" }
        ]
    },
    {
        id: 2,
        name: "Belfast",
        county: "Antrim/Down",
        province: "Ulster",
        type: "City",
        lat: 54.5973,
        lng: -5.9301,
        popularPlaces: [
            { name: "Titanic Belfast", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Titanic_Belfast_2012.jpg/800px-Titanic_Belfast_2012.jpg" },
            { name: "Crumlin Road Gaol", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Crumlin_Road_Gaol.jpg/800px-Crumlin_Road_Gaol.jpg" },
            { name: "St. George's Market", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/St_Georges_Market_Belfast_2010.jpg/800px-St_Georges_Market_Belfast_2010.jpg" },
            { name: "Botanic Gardens", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Palm_House_Belfast_Botanic_Gardens.jpg/800px-Palm_House_Belfast_Botanic_Gardens.jpg" }
        ]
    },
    {
        id: 3,
        name: "Cork",
        county: "Cork",
        province: "Munster",
        type: "City",
        lat: 51.8985,
        lng: -8.4756,
        popularPlaces: [
            { name: "The English Market", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/The_English_Market%2C_Cork.jpg/800px-The_English_Market%2C_Cork.jpg" },
            { name: "Cork City Gaol", image: "https://placehold.co/600x400?text=Cork+City+Gaol" },
            { name: "Fitzgerald Park", image: "https://placehold.co/600x400?text=Fitzgerald+Park" },
            { name: "Fota Wildlife Park", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Giraffe_Fota.jpg/800px-Giraffe_Fota.jpg" }
        ]
    },
    {
        id: 4,
        name: "Limerick",
        county: "Limerick",
        province: "Munster",
        type: "City",
        lat: 52.6638,
        lng: -8.6267,
        popularPlaces: [
            { name: "King John's Castle", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/King_John%27s_Castle_in_Limerick_%281%29.jpg/800px-King_John%27s_Castle_in_Limerick_%281%29.jpg" },
            { name: "The Milk Market", image: "https://placehold.co/600x400?text=The+Milk+Market" },
            { name: "Thomond Park", image: "https://placehold.co/600x400?text=Thomond+Park" },
            { name: "Limerick City Gallery of Art", image: "https://placehold.co/600x400?text=Limerick+Gallery" }
        ]
    },
    {
        id: 5,
        name: "Derry",
        county: "Derry",
        province: "Ulster",
        type: "City",
        lat: 54.9966,
        lng: -7.3086,
        popularPlaces: [
            { name: "City Walls", image: "https://placehold.co/600x400?text=Derry+City+Walls" },
            { name: "Peace Bridge", image: "https://placehold.co/600x400?text=Peace+Bridge" },
            { name: "Tower Museum", image: "https://placehold.co/600x400?text=Tower+Museum" },
            { name: "Guildhall", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Guildhall%2C_Derry.jpg/800px-Guildhall%2C_Derry.jpg" }
        ]
    },
    {
        id: 6,
        name: "Galway",
        county: "Galway",
        province: "Connacht",
        type: "City",
        lat: 53.2707,
        lng: -9.0568,
        popularPlaces: [
            { name: "Eyre Square", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Eyre_Square%2C_Galway_%28506260%29_%2826294603020%29.jpg/800px-Eyre_Square%2C_Galway_%28506260%29_%2826294603020%29.jpg" },
            { name: "Spanish Arch", image: "https://placehold.co/600x400?text=Spanish+Arch" },
            { name: "Galway Cathedral", image: "https://placehold.co/600x400?text=Galway+Cathedral" },
            { name: "Salthill Promenade", image: "https://placehold.co/600x400?text=Salthill+Promenade" }
        ]
    },
    {
        id: 7,
        name: "Waterford",
        county: "Waterford",
        province: "Munster",
        type: "City",
        lat: 52.2593,
        lng: -7.1101,
        popularPlaces: [
            { name: "Waterford Crystal", image: "https://placehold.co/600x400?text=Waterford+Crystal" },
            { name: "Viking Triangle", image: "https://placehold.co/600x400?text=Viking+Triangle" },
            { name: "Reginald's Tower", image: "https://placehold.co/600x400?text=Reginald%27s+Tower" },
            { name: "Mount Congreve Gardens", image: "https://placehold.co/600x400?text=Mount+Congreve" }
        ]
    },
    {
        id: 8,
        name: "Drogheda",
        county: "Louth",
        province: "Leinster",
        type: "Town",
        lat: 53.7189,
        lng: -6.3478,
        popularPlaces: [
            { name: "St. Peter's Church", image: "https://placehold.co/600x400?text=St+Peters+Church" },
            { name: "Laurence Gate", image: "https://placehold.co/600x400?text=Laurence+Gate" },
            { name: "Millmount Museum", image: "https://placehold.co/600x400?text=Millmount+Museum" },
            { name: "Boyne Viaduct", image: "https://placehold.co/600x400?text=Boyne+Viaduct" }
        ]
    },
    {
        id: 9,
        name: "Dundalk",
        county: "Louth",
        province: "Leinster",
        type: "Town",
        lat: 54.0000,
        lng: -6.4167,
        popularPlaces: [
            { name: "County Louth Museum", image: "https://placehold.co/600x400?text=Louth+Museum" },
            { name: "Proleek Dolmen", image: "https://placehold.co/600x400?text=Proleek+Dolmen" },
            { name: "St. Patrick's Cathedral", image: "https://placehold.co/600x400?text=St+Patricks+Cathedral" },
            { name: "Marshes Shopping Centre", image: "https://placehold.co/600x400?text=Marshes+Shopping" }
        ]
    },
    {
        id: 10,
        name: "Swords",
        county: "Dublin",
        province: "Leinster",
        type: "Town",
        lat: 53.4597,
        lng: -6.2181,
        popularPlaces: [
            { name: "Swords Castle", image: "https://placehold.co/600x400?text=Swords+Castle" },
            { name: "Pavilions Shopping Centre", image: "https://placehold.co/600x400?text=Pavilions+Shopping" },
            { name: "Ward River Valley Park", image: "https://placehold.co/600x400?text=Ward+River+Park" }
        ]
    },
    {
        id: 11,
        name: "Lisburn",
        county: "Antrim/Down",
        province: "Ulster",
        type: "City",
        lat: 54.5162,
        lng: -6.0581,
        popularPlaces: [
            { name: "Lisburn Museum", image: "https://placehold.co/600x400?text=Lisburn+Museum" },
            { name: "Castle Gardens", image: "https://placehold.co/600x400?text=Castle+Gardens" },
            { name: "Hillsborough Castle", image: "https://placehold.co/600x400?text=Hillsborough+Castle" },
            { name: "Lagan Valley LeisurePlex", image: "https://placehold.co/600x400?text=LeisurePlex" }
        ]
    },
    {
        id: 12,
        name: "Bray",
        county: "Wicklow",
        province: "Leinster",
        type: "Town",
        lat: 53.2026,
        lng: -6.0983,
        popularPlaces: [
            { name: "Bray Head", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bray-Head-View.jpg/800px-Bray-Head-View.jpg" },
            { name: "Bray Seafront", image: "https://placehold.co/600x400?text=Bray+Seafront" },
            { name: "Killruddery House", image: "https://placehold.co/600x400?text=Killruddery+House" },
            { name: "Mermaid Arts Centre", image: "https://placehold.co/600x400?text=Mermaid+Arts" }
        ]
    },
    {
        id: 13,
        name: "Navan",
        county: "Meath",
        province: "Leinster",
        type: "Town",
        lat: 53.6528,
        lng: -6.6814,
        popularPlaces: [
            { name: "Hill of Tara", image: "https://placehold.co/600x400?text=Hill+of+Tara" },
            { name: "Navan Centre", image: "https://placehold.co/600x400?text=Navan+Centre" },
            { name: "Blackwater Park", image: "https://placehold.co/600x400?text=Blackwater+Park" },
            { name: "Solstice Arts Centre", image: "https://placehold.co/600x400?text=Solstice+Arts" }
        ]
    },
    {
        id: 14,
        name: "Newtownabbey",
        county: "Antrim",
        province: "Ulster",
        type: "Town",
        lat: 54.6592,
        lng: -5.9072,
        popularPlaces: [
            { name: "Belfast Zoo", image: "https://placehold.co/600x400?text=Belfast+Zoo" },
            { name: "Newtownabbey Way", image: "https://placehold.co/600x400?text=Newtownabbey+Way" },
            { name: "Theatre at The Mill", image: "https://placehold.co/600x400?text=Theatre+at+The+Mill" }
        ]
    },
    {
        id: 15,
        name: "Bangor",
        county: "Down",
        province: "Ulster",
        type: "City",
        lat: 54.6536,
        lng: -5.6689,
        popularPlaces: [
            { name: "Bangor Marina", image: "https://placehold.co/600x400?text=Bangor+Marina" },
            { name: "Bangor Castle", image: "https://placehold.co/600x400?text=Bangor+Castle" },
            { name: "Pickie Funpark", image: "https://placehold.co/600x400?text=Pickie+Funpark" },
            { name: "North Down Museum", image: "https://placehold.co/600x400?text=North+Down+Museum" }
        ]
    },
    {
        id: 16,
        name: "Kilkenny",
        county: "Kilkenny",
        province: "Leinster",
        type: "City",
        lat: 52.6541,
        lng: -7.2448,
        popularPlaces: [
            { name: "Kilkenny Castle", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Kilkenny-castle.jpg/800px-Kilkenny-castle.jpg" },
            { name: "St. Canice's Cathedral", image: "https://placehold.co/600x400?text=St+Canices+Cathedral" },
            { name: "Smithwick's Experience", image: "https://placehold.co/600x400?text=Smithwicks+Experience" },
            { name: "Medieval Mile Museum", image: "https://placehold.co/600x400?text=Medieval+Mile" }
        ]
    },
    {
        id: 17,
        name: "Ennis",
        county: "Clare",
        province: "Munster",
        type: "Town",
        lat: 52.8436,
        lng: -8.9860,
        popularPlaces: [
            { name: "Ennis Friary", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/ENNIS_Friary%2C_DSC_4459.jpg/800px-ENNIS_Friary%2C_DSC_4459.jpg" },
            { name: "Clare Museum", image: "https://placehold.co/600x400?text=Clare+Museum" },
            { name: "Glór Theatre", image: "https://placehold.co/600x400?text=Glor+Theatre" },
            { name: "Muhammad Ali Monument", image: "https://placehold.co/600x400?text=Ali+Monument" }
        ]
    },
    {
        id: 18,
        name: "Carlow",
        county: "Carlow",
        province: "Leinster",
        type: "Town",
        lat: 52.8408,
        lng: -6.9261,
        popularPlaces: [
            { name: "Carlow Castle", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Carlow_Castle.jpg/800px-Carlow_Castle.jpg" },
            { name: "Brownshill Dolmen", image: "https://placehold.co/600x400?text=Brownshill+Dolmen" },
            { name: "Visual Centre", image: "https://placehold.co/600x400?text=Visual+Centre" },
            { name: "Delta Sensory Gardens", image: "https://placehold.co/600x400?text=Delta+Sensory+Gardens" }
        ]
    },
    {
        id: 19,
        name: "Tralee",
        county: "Kerry",
        province: "Munster",
        type: "Town",
        lat: 52.2713,
        lng: -9.7016,
        popularPlaces: [
            { name: "Kerry County Museum", image: "https://placehold.co/600x400?text=Kerry+County+Museum" },
            { name: "Tralee Town Park", image: "https://placehold.co/600x400?text=Tralee+Town+Park" },
            { name: "Blennerville Windmill", image: "https://placehold.co/600x400?text=Blennerville+Windmill" },
            { name: "Siamsa Tíre", image: "https://placehold.co/600x400?text=Siamsa+Tire" }
        ]
    },
    {
        id: 20,
        name: "Newbridge",
        county: "Kildare",
        province: "Leinster",
        type: "Town",
        lat: 53.1806,
        lng: -6.7969,
        popularPlaces: [
            { name: "Newbridge Silverware", image: "https://placehold.co/600x400?text=Newbridge+Silverware" },
            { name: "Whitewater Shopping Centre", image: "https://placehold.co/600x400?text=Whitewater+Shopping" },
            { name: "Liffey Linear Park", image: "https://placehold.co/600x400?text=Liffey+Linear+Park" }
        ]
    },
    {
        id: 21,
        name: "Portlaoise",
        county: "Laois",
        province: "Leinster",
        type: "Town",
        lat: 53.0344,
        lng: -7.2992,
        popularPlaces: [
            { name: "Rock of Dunamase", image: "https://placehold.co/600x400?text=Rock+of+Dunamase" },
            { name: "Emo Court", image: "https://placehold.co/600x400?text=Emo+Court" },
            { name: "Midlands Park", image: "https://placehold.co/600x400?text=Midlands+Park" },
            { name: "Dunamaise Arts Centre", image: "https://placehold.co/600x400?text=Dunamaise+Arts" }
        ]
    },
    {
        id: 22,
        name: "Balbriggan",
        county: "Dublin",
        province: "Leinster",
        type: "Town",
        lat: 53.6083,
        lng: -6.1817,
        popularPlaces: [
            { name: "Ardgillan Castle", image: "https://placehold.co/600x400?text=Ardgillan+Castle" },
            { name: "Balbriggan Beach", image: "https://placehold.co/600x400?text=Balbriggan+Beach" },
            { name: "Balbriggan Harbour", image: "https://placehold.co/600x400?text=Balbriggan+Harbour" }
        ]
    },
    {
        id: 23,
        name: "Naas",
        county: "Kildare",
        province: "Leinster",
        type: "Town",
        lat: 53.2156,
        lng: -6.6669,
        popularPlaces: [
            { name: "Naas Racecourse", image: "https://placehold.co/600x400?text=Naas+Racecourse" },
            { name: "Grand Canal", image: "https://placehold.co/600x400?text=Grand+Canal" },
            { name: "Moat Theatre", image: "https://placehold.co/600x400?text=Moat+Theatre" },
            { name: "Palmerstown House Estate", image: "https://placehold.co/600x400?text=Palmerstown+Estate" }
        ]
    },
    {
        id: 24,
        name: "Athlone",
        county: "Westmeath",
        province: "Leinster/Connacht",
        type: "Town",
        lat: 53.4239,
        lng: -7.9406,
        popularPlaces: [
            { name: "Athlone Castle", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Athlone_Castle_-_geograph.org.uk_-_4613780.jpg/800px-Athlone_Castle_-_geograph.org.uk_-_4613780.jpg" },
            { name: "Sean's Bar", image: "https://placehold.co/600x400?text=Seans+Bar" },
            { name: "Luan Gallery", image: "https://placehold.co/600x400?text=Luan+Gallery" },
            { name: "Glendeer Pet Farm", image: "https://placehold.co/600x400?text=Glendeer+Pet+Farm" }
        ]
    },
    {
        id: 25,
        name: "Mullingar",
        county: "Westmeath",
        province: "Leinster",
        type: "Town",
        lat: 53.5264,
        lng: -7.3389,
        popularPlaces: [
            { name: "Belvedere House Gardens", image: "https://placehold.co/600x400?text=Belvedere+House" },
            { name: "Joe Dolan Statue", image: "https://placehold.co/600x400?text=Joe+Dolan+Statue" },
            { name: "Cathedral of Christ the King", image: "https://placehold.co/600x400?text=Cathedral+Christ+King" },
            { name: "Royal Canal Greenway", image: "https://placehold.co/600x400?text=Royal+Canal" }
        ]
    },
    {
        id: 26,
        name: "Celbridge",
        county: "Kildare",
        province: "Leinster",
        type: "Town",
        lat: 53.3397,
        lng: -6.5408,
        popularPlaces: [
            { name: "Castletown House", image: "https://placehold.co/600x400?text=Castletown+House" },
            { name: "Celbridge Abbey", image: "https://placehold.co/600x400?text=Celbridge+Abbey" },
            { name: "Arthur's Way", image: "https://placehold.co/600x400?text=Arthurs+Way" }
        ]
    },
    {
        id: 27,
        name: "Wexford",
        county: "Wexford",
        province: "Leinster",
        type: "Town",
        lat: 52.3369,
        lng: -6.4633,
        popularPlaces: [
            { name: "National Heritage Park", image: "https://placehold.co/600x400?text=National+Heritage+Park" },
            { name: "Wexford Opera House", image: "https://placehold.co/600x400?text=Opera+House" },
            { name: "Selskar Abbey", image: "https://placehold.co/600x400?text=Selskar+Abbey" },
            { name: "Johnstown Castle", image: "https://placehold.co/600x400?text=Johnstown+Castle" }
        ]
    },
    {
        id: 28,
        name: "Letterkenny",
        county: "Donegal",
        province: "Ulster",
        type: "Town",
        lat: 54.9500,
        lng: -7.7333,
        popularPlaces: [
            { name: "Glenveagh National Park", image: "https://placehold.co/600x400?text=Glenveagh+Park" },
            { name: "Cathedral of St. Eunan", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Letterkenny_Cathedral_%2810827164125%29.jpg/800px-Letterkenny_Cathedral_%2810827164125%29.jpg" },
            { name: "Donegal County Museum", image: "https://placehold.co/600x400?text=Donegal+Museum" },
            { name: "Tropical World", image: "https://placehold.co/600x400?text=Tropical+World" }
        ]
    },
    {
        id: 29,
        name: "Sligo",
        county: "Sligo",
        province: "Connacht",
        type: "Town",
        lat: 54.2697,
        lng: -8.4694,
        popularPlaces: [
            { name: "Benbulben", image: "https://placehold.co/600x400?text=Benbulben" },
            { name: "Sligo Abbey", image: "https://placehold.co/600x400?text=Sligo+Abbey" },
            { name: "Yeats Society", image: "https://placehold.co/600x400?text=Yeats+Society" },
            { name: "Strandhill Beach", image: "https://placehold.co/600x400?text=Strandhill+Beach" }
        ]
    },
    {
        id: 30,
        name: "Greystones",
        county: "Wicklow",
        province: "Leinster",
        type: "Town",
        lat: 53.1406,
        lng: -6.0631,
        popularPlaces: [
            { name: "South Beach", image: "https://placehold.co/600x400?text=South+Beach" },
            { name: "The Cliff Walk", image: "https://placehold.co/600x400?text=Cliff+Walk" },
            { name: "Greystones Harbour", image: "https://placehold.co/600x400?text=Greystones+Harbour" }
        ]
    },
    {
        id: 31,
        name: "Clonmel",
        county: "Tipperary",
        province: "Munster",
        type: "Town",
        lat: 52.3558,
        lng: -7.7033,
        popularPlaces: [
            { name: "Carey's Castle", image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Carey_Castle.jpg" },
            { name: "Tipperary County Museum", image: "https://placehold.co/600x400?text=Tipperary+Museum" },
            { name: "St. Patrick's Well", image: "https://placehold.co/600x400?text=St+Patricks+Well" },
            { name: "Comeragh Mountains", image: "https://placehold.co/600x400?text=Comeragh+Mountains" }
        ]
    },
    {
        id: 32,
        name: "Malahide",
        county: "Dublin",
        province: "Leinster",
        type: "Town",
        lat: 53.4508,
        lng: -6.1542,
        popularPlaces: [
            { name: "Malahide Castle", image: "https://placehold.co/600x400?text=Malahide+Castle" },
            { name: "Malahide Beach", image: "https://placehold.co/600x400?text=Malahide+Beach" },
            { name: "Toots the Train", image: "https://placehold.co/600x400?text=Toots+the+Train" }
        ]
    },
    {
        id: 33,
        name: "Carrigaline",
        county: "Cork",
        province: "Munster",
        type: "Town",
        lat: 51.8117,
        lng: -8.3953,
        popularPlaces: [
            { name: "Community Park", image: "https://placehold.co/600x400?text=Community+Park" },
            { name: "Owenabue Valley Park", image: "https://placehold.co/600x400?text=Owenabue+Park" },
            { name: "Currabinny Wood", image: "https://placehold.co/600x400?text=Currabinny+Wood" }
        ]
    },
    {
        id: 34,
        name: "Leixlip",
        county: "Kildare",
        province: "Leinster",
        type: "Town",
        lat: 53.3658,
        lng: -6.4950,
        popularPlaces: [
            { name: "The Wonderful Barn", image: "https://placehold.co/600x400?text=Wonderful+Barn" },
            { name: "Leixlip Castle", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Castle-0458%2C_Leixlip%2C_County_Kildare%2C_Ireland.jpg/800px-Castle-0458%2C_Leixlip%2C_County_Kildare%2C_Ireland.jpg" },
            { name: "St. Catherine's Park", image: "https://placehold.co/600x400?text=St+Catherines+Park" }
        ]
    },
    {
        id: 35,
        name: "Tullamore",
        county: "Offaly",
        province: "Leinster",
        type: "Town",
        lat: 53.2739,
        lng: -7.4889,
        popularPlaces: [
            { name: "Tullamore D.E.W.", image: "https://placehold.co/600x400?text=Tullamore+DEW" },
            { name: "Charleville Castle", image: "https://placehold.co/600x400?text=Charleville+Castle" },
            { name: "Lloyd Town Park", image: "https://placehold.co/600x400?text=Lloyd+Town+Park" }
        ]
    },
    {
        id: 36,
        name: "Maynooth",
        county: "Kildare",
        province: "Leinster",
        type: "Town",
        lat: 53.3817,
        lng: -6.5919,
        popularPlaces: [
            { name: "Maynooth University", image: "https://placehold.co/600x400?text=Maynooth+University" },
            { name: "Maynooth Castle", image: "https://placehold.co/600x400?text=Maynooth+Castle" },
            { name: "Carton House", image: "https://placehold.co/600x400?text=Carton+House" }
        ]
    },
    {
        id: 37,
        name: "Killarney",
        county: "Kerry",
        province: "Munster",
        type: "Town",
        lat: 52.0599,
        lng: -9.5044,
        popularPlaces: [
            { name: "National Park", image: "https://placehold.co/600x400?text=Killarney+Park" },
            { name: "Ross Castle", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Ross_Castle%2C_I%2C_Killarney._County_Kerry%2C_Ireland.jpg/800px-Ross_Castle%2C_I%2C_Killarney._County_Kerry%2C_Ireland.jpg" },
            { name: "Muckross House", image: "https://placehold.co/600x400?text=Muckross+House" },
            { name: "Torc Waterfall", image: "https://placehold.co/600x400?text=Torc+Waterfall" }
        ]
    },
    {
        id: 38,
        name: "Arklow",
        county: "Wicklow",
        province: "Leinster",
        type: "Town",
        lat: 52.7978,
        lng: -6.1536,
        popularPlaces: [
            { name: "Maritime Museum", image: "https://placehold.co/600x400?text=Maritime+Museum" },
            { name: "Bridgewater Shopping", image: "https://placehold.co/600x400?text=Bridgewater" },
            { name: "Arklow Bay", image: "https://placehold.co/600x400?text=Arklow+Bay" }
        ]
    },
    {
        id: 39,
        name: "Cobh",
        county: "Cork",
        province: "Munster",
        type: "Town",
        lat: 51.8503,
        lng: -8.2944,
        popularPlaces: [
            { name: "Titanic Experience", image: "https://placehold.co/600x400?text=Titanic+Experience" },
            { name: "Spike Island", image: "https://placehold.co/600x400?text=Spike+Island" },
            { name: "St. Colman's Cathedral", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/06289_IRL_Cobh_Cathedral_V-P.jpg/600px-06289_IRL_Cobh_Cathedral_V-P.jpg" },
            { name: "Cobh Heritage Centre", image: "https://placehold.co/600x400?text=Heritage+Centre" }
        ]
    },
    {
        id: 40,
        name: "Castlebar",
        county: "Mayo",
        province: "Connacht",
        type: "Town",
        lat: 53.8558,
        lng: -9.2981,
        popularPlaces: [
            { name: "Museum of Country Life", image: "https://placehold.co/600x400?text=Country+Life+Museum" },
            { name: "Lough Lannagh", image: "https://placehold.co/600x400?text=Lough+Lannagh" },
            { name: "Linenhall Arts Centre", image: "https://placehold.co/600x400?text=Linenhall+Arts" }
        ]
    },
    {
        id: 41,
        name: "Ballina",
        county: "Mayo",
        province: "Connacht",
        type: "Town",
        lat: 54.1167,
        lng: -9.1500,
        popularPlaces: [
            { name: "Belleek Woods", image: "https://placehold.co/600x400?text=Belleek+Woods" },
            { name: "River Moy", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/River_Moy_in_Ballina.jpg/800px-River_Moy_in_Ballina.jpg" },
            { name: "Jackie Clarke Collection", image: "https://placehold.co/600x400?text=Jackie+Clarke" }
        ]
    },
    {
        id: 42,
        name: "Newry",
        county: "Down/Armagh",
        province: "Ulster",
        type: "City",
        lat: 54.1751,
        lng: -6.3402,
        popularPlaces: [
            { name: "Newry Cathedral", image: "https://placehold.co/600x400?text=Newry+Cathedral" },
            { name: "Bagenal's Castle", image: "https://placehold.co/600x400?text=Bagenals+Castle" },
            { name: "Slieve Gullion", image: "https://placehold.co/600x400?text=Slieve+Gullion" }
        ]
    },
    {
        id: 43,
        name: "Shannon Airport",
        county: "Clare",
        province: "Munster",
        type: "Airport",
        lat: 52.7019,
        lng: -8.9248,
        popularPlaces: [
            { name: "Aviation Museum", image: "https://placehold.co/600x400?text=Aviation+Museum" },
            { name: "Bunratty Castle", image: "https://placehold.co/600x400?text=Bunratty+Castle" },
            { name: "Duty Free", image: "https://placehold.co/600x400?text=Duty+Free" }
        ]
    },
    {
        id: 44,
        name: "Dublin Airport",
        county: "Dublin",
        province: "Leinster",
        type: "Airport",
        lat: 53.4213,
        lng: -6.2701,
        popularPlaces: [
            { name: "The Loop", image: "https://placehold.co/600x400?text=The+Loop" },
            { name: "Terminals 1 & 2", image: "https://upload.wikimedia.org/wikipedia/commons/2/23/DublinAirportfromtheair.jpg" },
            { name: "Alcock and Brown", image: "https://placehold.co/600x400?text=Alcock+Brown" }
        ]
    },
    {
        id: 45,
        name: "Cork Airport",
        county: "Cork",
        province: "Munster",
        type: "Airport",
        lat: 51.8413,
        lng: -8.4911,
        popularPlaces: [
            { name: "Kinsale (Nearby)", image: "https://placehold.co/600x400?text=Kinsale" },
            { name: "Airport Business Park", image: "https://placehold.co/600x400?text=Business+Park" }
        ]
    },
    {
        id: 46,
        name: "Knock Airport",
        county: "Mayo",
        province: "Connacht",
        type: "Airport",
        lat: 53.9103,
        lng: -8.8185,
        popularPlaces: [
            { name: "Knock Shrine", image: "https://upload.wikimedia.org/wikipedia/commons/7/70/Knock_shrine.JPG" },
            { name: "Visitor Area", image: "https://placehold.co/600x400?text=Visitor+Area" }
        ]
    },
    {
        id: 47,
        name: "Kerry Airport",
        county: "Kerry",
        province: "Munster",
        type: "Airport",
        lat: 52.1809,
        lng: -9.5238,
        popularPlaces: [
            { name: "Ring of Kerry", image: "https://placehold.co/600x400?text=Ring+of+Kerry" },
            { name: "Farranfore Station", image: "https://placehold.co/600x400?text=Train+Station" }
        ]
    }
];