import React, {Component} from 'react';
import {inject, observer} from "mobx-react";

@inject("stores")
@observer
class Advertise extends Component {

    state = {
        ads : null
    }

    async componentDidMount() {
        let advertisements = await this.props.stores.AdStore.getAds();
        this.setState({
            ads : advertisements
        });
    }

    render()
    {
        if(this.state.ads)
        {
            return(
                <div>
                    <ul>
                        {this.state.ads.map(ad => {
                            return(
                                <li key={ad.id}>
                                    {console.log(ad)}
                                    <a href={ad.url}>
                                        <img src={`http://localhost:8080/attachment/${ad.imagePath}`} width="50px" height="50px" alt=""></img>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )
        }
        else
            return (
                <div></div>
            )
    }

}

export default Advertise;