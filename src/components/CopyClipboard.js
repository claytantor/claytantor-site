import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Copy as FeatherCopyToClipboard } from 'react-feather';

class CopyClipboard extends React.Component {

    state = {
        value: '3GE8cxhRpckCu1m326jCkaeLpcstzzk25F',
        copied: false,
    };    

    render() {
        return (<>
                <div className="copy-clipboard">

                    <input className="address-field" value={this.state.value}
                        onChange={({target: {value}}) => this.setState({value, copied: false})} />

                    <CopyToClipboard className="mb-2" text={this.state.value}
                        onCopy={() => this.setState({copied: true})}>
                        <span><FeatherCopyToClipboard color="white" size={32}/></span>
                    </CopyToClipboard>

                    
                </div>
                <div>{this.state.copied ? <span style={{color: 'green'}}>Copied.</span> : null}</div>
            </>);
    };
}

export default CopyClipboard