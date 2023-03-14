import React from "react";

const Test = props => {

    return(
        <div className="hero" style={{overflowY:"scroll"}}>
            <div className="hero-body">
                <h1> Test </h1>

                
                <div className="box">
                    <h1>testing</h1>
                    <embed type="image/jpg" src={process.env.PUBLIC_URL + "/images/defaults/volunteers" + "/Animals.jpg"} width="300" height="200" />
                    <embed src="https://twitter.com/i/status/1634628743762149376"/>
                    <blockquote className="twitter-tweet"><p lang="en" dir="ltr">6️⃣.7️⃣0️⃣ for Tyreek Hill! <a href="https://twitter.com/cheetah?ref_src=twsrc%5Etfw">@cheetah</a> won the men’s 60m at the USATF Masters Indoor Championships 💥<a href="https://twitter.com/hashtag/USATF?src=hash&amp;ref_src=twsrc%5Etfw">#USATF</a> <a href="https://t.co/2DVWzoeOqe">pic.twitter.com/2DVWzoeOqe</a></p>&mdash; USATF (@usatf) <a href="https://twitter.com/usatf/status/1634628743762149376?ref_src=twsrc%5Etfw">March 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                    <embed type="image/jpg" src="http://127.0.0.1:5000/api/test-function4"/>
                    <br/>
                    {/*<iframe src="http://127.0.0.1:5000/api/test-function3" width="600" height="600"/>*/}
                    <iframe src="http://127.0.0.1:5000/api/test-function4/test-name" width="600" height="600"/>
                    <iframe src="http://127.0.0.1:5000/api/test-function5?username=cheyko" width="600" height="600"/>
                    <iframe className="iframe-container" src="http://127.0.0.1:5000/api/test-function6?username=super-man" width="600" height="600"/>

                </div>
            </div>
        </div>
    )
}
export default Test;