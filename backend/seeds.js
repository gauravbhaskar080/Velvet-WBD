const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
// const SubCategory = require('./models/SubCategory');
// const Customer = require('./models/Customer')
// const Admin = require('./models/Admin')
const Object = require('./models/Object')
const HomeObject = require('./models/HomeObjects');
// const DiscountCode = require('./models/DiscountCode')

mongoose.connect('mongodb+srv://ayush:ayush@cluster0.i09ljc9.mongodb.net/velvet_homes?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const hashPassword = async (pw) => {
    const hash = await bcrypt.hash(pw, 12);
    return hash;
}

// code to register new customer 

// const user = new Customer();
//     const p = await hashPassword("ayush.adarsh")
//     user.username = "ayush.adarsh@gmail.com"
//     user.password = p
//     user.fullname = "Ayush Adarsh"
//     user.phone = "9978546321"
//     user.address = "Gola Road,Patna"
//     user.pincode = "801503"
//     user.photo = "https://whereverfamily.com/wp-content/uploads/2018/02/dreamstime_m_14026311-e1517592384559.jpg"
//     user.totalPurchase = 0
//     await user.save();


// code to register new admin 

// const ad = new Admin();
//     const p = await hashPassword("admin123");
//     ad.username = "admin@gmail.com"
//     ad.password = p
//     ad.totalBusiness = 0
//     ad.totalProfit = 0
//     await ad.save()


// Code To Create New Discount Code 
// const dc = new DiscountCode();
// dc.code = "OPENING5"
// dc.discountpercent = 5
// dc.to = ["ALL"]
// await dc.save()
const seedsHelper = async () => {
    const hd = new HomeObject();
    hd.title = "Artifacts"
    const prod1 = await Object.findById("64c8c6e4f27ebc21405161a7")
    const prod2 = await Object.findById("64c8befaf27ebc214051616d")

    const prod3 = await Object.findById("64c8c084f27ebc2140516183")
    
    const prod4 = await Object.findById("64c8c28cf27ebc2140516191")
    const prod5 = await Object.findById("64c8c3c3f27ebc2140516197")
    
    const prod6 = await Object.findById("64c8c588f27ebc21405161a1")

    hd.products.push(prod1)
    hd.products.push(prod2)
    hd.products.push(prod3)
    hd.products.push(prod4)
    hd.products.push(prod5)
    hd.products.push(prod6)
    hd.designimg = "https://img.freepik.com/premium-photo/gold-lion-statue-is-table-front-window_853177-583.jpg"
    await hd.save();
}
// seedsHelper()



// const obj = await Object.find();
// obj.map(async (o)=>{
//     o.quantitySold = 0
//     await o.save()
// })


const allfunctions = async () => {
    await seedsHelper("Living Room Floor Tiles", "Tiles","https://somany-uat.s3.amazonaws.com/banner/62f16e41-7894-4907-9e07-b2f54054c7a9-1677487996030.jpg","https://images.orientbell.com/media/catalog/product/cache/b9393dc52362842095b7f55239e9b36f/c/r/cresent_bianco_living_room_ambiance_double_charge_floor_tile_800x1200_mm.jpg");
    await seedsHelper("Bed Room Floor Tiles", "Tiles","https://somany-uat.s3.amazonaws.com/banner/77e9b45a-2310-4c90-ad0f-26199bc87395-1677562646233.jpg","https://images.orientbell.com/media/catalog/product/cache/b9393dc52362842095b7f55239e9b36f/g/f/gft_bdf_double_rivet_wood_bedroom_germfree_forever_tiles_porcelain_floor_tile_600x600_mm_1.jpg");
    await seedsHelper("Bed Room Wall Tiles", "Tiles","https://somany-uat.s3.amazonaws.com/banner/84a99bb8-c413-49cd-8c14-1a00eb6c61e8-1677488194984.jpg","https://m.media-amazon.com/images/I/61XQYQAh2DL._SX522_.jpg");
    await seedsHelper("Bath Room Wall Tiles", "Tiles","https://somany-uat.s3.amazonaws.com/banner/9c1c7667-6f70-448c-adb9-5be672315fa6-1677488409768.jpg","https://images.orientbell.com/media/catalog/product/cache/b9393dc52362842095b7f55239e9b36f/o/d/odg-dorma-black-odg-dorma-grey-lt-odh-dorma-chess-hl-bathroom-30x45-cm.jpg");
    await seedsHelper("Bath Room Floor Tiles", "Tiles","https://somany-uat.s3.amazonaws.com/banner/de66c7a9-2cc4-4f5d-bce6-ada1e572a08b-1677488381199.jpg","https://images.orientbell.com/media/catalog/product/cache/b9393dc52362842095b7f55239e9b36f/b/d/bdm_anti-skid_ec_diamond_carrara_bathroom_ceramic_floor_tile_300x300mm.jpg");
    await seedsHelper("Kitchen Wall Tiles", "Tiles","https://somany-uat.s3.amazonaws.com/banner/1c86eaf3-5455-478c-b88a-b1ae610f8fa8-1677494199741.jpg","https://images.orientbell.com/media/catalog/product/cache/b9393dc52362842095b7f55239e9b36f/o/d/odg-emilia-brown-odg-emilia-beige-odh-emilia-hl-kitchen-30x45-cm.jpg");
    await seedsHelper("Kitchen Floor Tiles", "Tiles","https://somany-uat.s3.amazonaws.com/banner/946e40d6-121a-453e-b327-ce515af02a87-1677488239050.jpg","https://images.orientbell.com/media/catalog/product/cache/b9393dc52362842095b7f55239e9b36f/o/d/odg_debona_creama_dk_odg_debona_creama_lt_odh_muffin_coffee_bean_hl_300x450_mm_1.jpg");

    await seedsHelper("Beds","Furniture","https://www.minotti.com/media/immagini/31757_n_MINOTTI_BRASILIA_BED_01.jpg","https://cb2.scene7.com/is/image/CB2/ParkerStorageKingBedSHF20_1x1/$web_pdp_main_carousel_md$/200813113042/parker-storage-king-bed.jpg")
    await seedsHelper("Tables","Furniture","https://images.pexels.com/photos/17057017/pexels-photo-17057017/free-photo-of-interior-of-restaurant-hall.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1","https://cb2.scene7.com/is/image/CB2/AquaVirgoSmallDarkBrownAG21_1x1/$web_pdp_main_carousel_md$/230302033250/AquaVirgoSmallDarkBrownAG21_1x1.jpg")
    await seedsHelper("Chairs","Furniture","https://artyz.in/wp-content/uploads/2019/01/artyz-blog-post.png","https://cb2.scene7.com/is/image/CB2/FoleyVlvtMinkDnngChairSHF20_1x1/$web_pdp_main_carousel_md$/210518111049/foley-mink-velvet-dining-chair.jpg")
    await seedsHelper("Almirah","Furniture","https://i.pinimg.com/originals/f9/99/84/f9998463bc8c7126389509a82c08082f.jpg","https://www.ulcdn.net/images/products/314046/slide/666x363/Baltoro_Wardrobe_White_1.jpg?1612598408")
    await seedsHelper("Dinning Tables","Furniture","https://www.cherrypickindia.in/wp-content/uploads/2021/12/pexels-max-vakhtbovych-6587894-848x500.jpg","https://cb2.scene7.com/is/image/CB2/CrowleyTpdLegDiningTableSHS23/$web_pdp_main_carousel_md$/221201151022/crowley-black-wood-dining-table.jpg")
    await seedsHelper("Cabinets","Furniture","https://somany-uat.s3.amazonaws.com/banner/b9cf5704-3439-4c38-9320-1aeba053a4c4-1679306512037.jpg","https://cb2.scene7.com/is/image/CB2/RossoOxBldEntrywayCbntSHS22/$web_pdp_main_carousel_md$/211028102232/rosso-oxblood-entryway-cabinet.jpg")
    await seedsHelper("Sofa","Furniture","https://i.pinimg.com/736x/13/88/f9/1388f9acd16c3f620c350582c2f03115.jpg","https://cb2.scene7.com/is/image/CB2/CurvoSnowSofaJN21_1x1/$web_pdp_main_carousel_md$/230302033007/CurvoSnowSofaJN21_1x1.jpg")
    await seedsHelper("Shoe Storage","Furniture","https://www.propertypro.ng/blog/wp-content/uploads/2017/07/079-4-types-of-modern-shoerack.jpg","https://www.ulcdn.net/images/products/683779/slide/666x363/FVSGSR61BK23708_1.jpg?1665041636")

    await seedsHelper("Shower","Sanitary","https://somany-uat.s3.amazonaws.com/banner/a96419b0-1aaf-4f28-b6d6-24648bffbd45-1677102050902.jpg","https://cdn.shopify.com/s/files/1/0561/1913/2203/products/819M04S-O4S._AC_SL1500.jpg?v=1673340407&width=493")
    await seedsHelper("Taps","Sanitary","https://somany-uat.s3.amazonaws.com/banner/9e1ce38c-3579-4038-880f-57b153428d28-1677102235642.jpg","https://cdn.shopify.com/s/files/1/0561/1913/2203/products/Image15_44a2b256-a0ad-4a71-9d8f-3776ab0e9524.png?v=1679563045&width=493")
    await seedsHelper("BathTubs","Sanitary","https://5.imimg.com/data5/XT/QV/MY-5194302/jacuzzi-bathtub-500x500.jpg","https://www.jaquar.com/images/thumbs/0011903_queens_960.jpeg")
    await seedsHelper("WashBasin","Sanitary","https://somany-uat.s3.amazonaws.com/banner/0d84010f-aa4e-458f-8c2b-1d4800e1a114-1679306275495.jpg","https://cdn.shopify.com/s/files/1/0561/1913/2203/products/FINAL1logo_40809a0e-a929-4f55-963e-abe2fdf6ed3a.png?v=1678167956&width=493")
    await seedsHelper("Urinals","Sanitary","https://somany-uat.s3.amazonaws.com/banner/9e1d4423-c711-42a0-ad71-3e4bbcfb67e8-1677098285857.jpeg","https://hindware.com/wp-content/uploads/2021/03/Aquafree-Uri-435x397.png")
    await seedsHelper("Toilets","Sanitary","https://somany-uat.s3.amazonaws.com/banner/0fde91c6-a701-415d-93c7-f5330916d496-1677099031053.jpeg","https://backend.johnsonbathrooms.in/media/catalog/product/g/4/g4107pw0104.jpg")
    await seedsHelper("Bath Accessroies","Sanitary","https://somany-uat.s3.amazonaws.com/banner/99e7d8c0-309c-4470-83f0-2c4deb687e97-1677100828238.jpg","https://cb2.scene7.com/is/image/CB2/NexusBlkMrblCollectionFHS23/$web_pdp_main_carousel_md$/221006172252/nexus-black-marble-bath-accessories.jpg")
    await seedsHelper("Kitchen Sinks","Sanitary","https://somany-uat.s3.amazonaws.com/banner/1087e92f-1e89-49ce-b8a5-10c605168625-1677097383548.jpeg","https://images.unsplash.com/photo-1609210884848-2d530cfb2a07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2l0Y2hlbiUyMHNpbmt8ZW58MHx8MHx8&w=1000&q=80")

    await seedsHelper("Artifacts","Artifacts","https://www.whiteteak.com/media/catalog/category/New-Arrivals.jpg")
    await seedsHelper("Paints","Paints","https://www.bergerpaints.com/resources/images/home-owl/breathe-easy-home-banner.jpg")
}
// allfunctions();