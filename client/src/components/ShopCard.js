import { Link } from 'react-router-dom';

function ShopCard({ shopDetails, index }) {

    const shopImgArr =
        [
            "https://img.freepik.com/premium-photo/illustration-digital-art-drawing-store-shop-market-generative-ai_35887-14371.jpg?w=1060",
            "https://img.freepik.com/free-photo/man-looking-clothes-full-shot_23-2150082889.jpg?w=1060&t=st=1693850876~exp=1693851476~hmac=376c878f2ea22041cb4a73d443c99f1abe3849e26c5490f93eb772b0c3bf347f",
            "https://img.freepik.com/premium-photo/interior-photo-ikea-damansara-malaysia-member-preview-sale_176841-43127.jpg?w=1380",
            "https://img.freepik.com/free-photo/various-cakes-supermarket-shelves-sale_627829-7332.jpg?w=1060&t=st=1693851534~exp=1693852134~hmac=33af2b66e68f63bebc2e22630ea372512ec6566f4b587b820e083db8169d6600",
            "https://img.freepik.com/free-photo/textiles-sale_1398-3775.jpg?w=900&t=st=1693851510~exp=1693852110~hmac=a2979d626d8acc92844df94b38d75fd6374c2e35649beb36ac86601ee8063960",
            "https://img.freepik.com/premium-photo/international-coffee-day-delicious-coffee-beautiful-latte-decoration-business-afternoon-tea-drinks_911849-239358.jpg",
            "https://img.freepik.com/premium-photo/photo-inside-empty-stationary-shop-photography-ai-generated_925376-7269.jpg?w=1060"
        ]
    console.log("indsc " + JSON.stringify(index));
    return (
        <>
            <div className="shop-comp mr-1 mb-5 col-3" key={index}>
                <div className="card" style={{ width: "18rem" }}>
                    <img src={shopImgArr[index]} className="card-img-top home-shpimg" alt="..." />
                    <div className="card-body">
                        <h5 className="hm-shp-nm card-title mb-3 fs-3">{shopDetails.shopName}</h5>
                        <span className="details">{shopDetails.area} - {shopDetails.pincode}</span>
                    </div>
                    <ul className="list-group list-group-flush">
                        {/* <li className="list-group-item">Area: {shopDetails.area}</li> */}
                        {/* <li className="list-group-item">Owner: {shopDetails.ownerName}</li> */}
                        {/* <li className="list-group-item">Pincode: {shopDetails.pincode}</li> */}
                    </ul>
                    <div className="ratings line">Rating: <span>&#9733; &#9733; &#9733; &#9733; &#9734;</span></div>
                    <p className="own line">
                        <span className="ownedby">Owned By - </span>
                        <span className="ownername">{shopDetails.ownerName}</span>
                    </p>
                    <div className="card-body">
                        <Link to={`/customer/shop?sname=${shopDetails.shopName}&sind=${index}`} className="btn btn-primary">More Details</Link>
                        {/* <a href="/" className="card-link">Another link</a> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopCard;