import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AllCeremonies extends Component {
  constructor() {
    super();
    this.state = {
      matchUps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  }

  images = {
    1: 'http://mtv.mtvnimages.com/Asset-Production/Are-You-The-One/season-8/806/images/EP_RUO_806_Highlight_A_565c51a8_7b45_46ae_9cf3_43e49a51165f.jpg?quality=0.85&width=1082&height=610&crop=true',
    2: 'https://www.intouchweekly.com/wp-content/uploads/2017/12/are-you-the-one-season-6-perfect-matches.png',
    3: 'https://d24bnpykhxwj9p.cloudfront.net/s3file/s3fs-public/users1/2017-01/Thu/Screen%20Shot%202017-01-19%20at%204.07.15%20PM.png',
    4: 'https://d24bnpykhxwj9p.cloudfront.net/s3file/s3fs-public/users1/2017-09/Fri/matchup.png',
    5: 'http://mtv.com/news/wp-content/uploads/rc/2014/01/ListGroup.jpg',
    6: 'http://mtv-intl.mtvnimages.com/uri/mgid:arc:content:mtvasia.com:0ea7ad38-63a1-11e5-8ff7-0026b9414f30?ep=mtvasia.com&stage=live&format=jpg&quality=0.8&&&quality=0.85&width=1029&height=581&crop=true',
    7: 'http://mtv.mtvnimages.com/Asset-Production/Are-You-The-One/season-8/802/HD_RUO_801_802_A9b7fb99a_8eb0_4fa5_a729_076c428855ca.jpg',
    8: 'https://d24bnpykhxwj9p.cloudfront.net/s3file/s3fs-public/users1/2017-01/Fri/Screen%20Shot%202017-01-27%20at%2011.32.15%20AM.png',
    9: 'https://d24bnpykhxwj9p.cloudfront.net/s3file/s3fs-public/users1/2017-10/Mon/Screen%20Shot%202017-10-23%20at%201.26.06%20PM.png',
    10: 'https://pyxis.nymag.com/v1/imgs/232/a32/d0ab3544c535e4be173a14610851ba1a3f-10-are-you-the-one-matchup.2x.h467.w700.jpg',
  };

  render() {
    const { matchUps } = this.state;
    return (
      <div className="container">
        <div className="allMatchUpsList">
          {matchUps.map((num) => (
            <Link to={`/ceremonies/${num}`}>
              <div key={num} className="singleMatchUp">
                <img className="matchUpImage" src={this.images[num]} />
                <br />
                <div className="matchUpNumberContainer">
                  <div className="matchUpNumberText">Match Up {num}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
