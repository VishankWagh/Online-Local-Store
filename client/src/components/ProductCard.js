import { Link, useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

function ProductCard({ prod, removeDesc, addToCart, imgUrl, sname }) {
    const { name, desc, price, qty, reviews, image } = prod;

    const navigate = useNavigate();

    function createStars(stars) {
        // console.log("str " + stars);
        return Array.from({ length: 5 }, (_, index) => {
            stars--;
            return stars >= 0 ? <span key={index}>&#9733;</span> : <span key={index}>&#9734;</span>;
        });
    }

    function getAvgRatings() {
        let avg = 0;
        let n = 0;
        reviews?.map((rv) => {
            avg += rv.rating;
            n++;
        })
        return avg / n;
    }

    return (
        <>
            <div className="card col-3 mx-2">
                <img src={image || imgUrl} height="187px" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">
                        {/* <span className="prd-nm">{name.slice(0, 18)}<br />{name.slice(18, name.length)}</span> */}
                        <span className="prd-nm">
                            {name.replace("-", ' ')}
                            {name.length < 23 && <br />}
                        </span><span className="ratings r-rate">
                            {createStars(getAvgRatings())}
                        </span>
                        <br />
                        <span className="offer-price price"><strike>&#8377; {price * 2}</strike></span>
                        <span className="price">&#8377; {price}</span>
                    </h5>
                    {/* <div className="shop-name" style={{ color: "grey", fontSize: "15px", paddingBottom: ".5rem" }}>{props.sname}</div> */}
                    {!removeDesc && <p className="card-text">{desc.slice(0, 25) + "..."}</p>}
                    {removeDesc ?
                        <a href={`/customer/product?sname=${sname}&pname=${name}`} className="btn">More Details</a> :
                        <Link to={`/customer/product?sname=${sname}&pname=${name}`} className="btn">More Details</Link>}
                    {/* <button onClick={() => { navigate(`/customer/product?sname=${sname}&pname=${name}`) }} className="btn">More Details</button> */}
                    <a className="btn addcartbtn" onClick={() => {
                        let citm = {
                            "prodName": name,
                            "qty": 1,
                            "price": price,
                            image
                        }
                        addToCart(sname, citm);
                    }}>Add To Cart</a>
                </div>
            </div>
        </>
    );
}

export default ProductCard;