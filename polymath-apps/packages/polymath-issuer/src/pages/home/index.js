import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PageCentered, Button } from '@polymathnetwork/ui';

export default class HomePage extends Component {
  render() {
    return (
      <PageCentered title="Morpheus Labs" justifyContent="start">
        
        <div>
          <h1 className="pui-h0">
            The Next Mega-Trend
            <br />
            in Crypto is the Emergence
            <br /> of Securities Tokens
          </h1>
          <h3 className="pui-h3">
            Morpheus Labs enables trillions of dollars of securities to be
            issued
            <br /> and traded on the blockchain.
          </h3>
          <br />
          <br />
          <p>
            <Link to="/ticker">
              <Button id="create-token-btn" icon="arrow--right">
                Create your security token
              </Button>
            </Link>
          </p>
        </div>
      </PageCentered>
    );
  }
}
