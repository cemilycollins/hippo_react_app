import React from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { updateMapCenter } from '../redux/actions'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

class MapPlacesSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.props.updateMapCenter({center: latLng, zoom: 12})
        this.props.push('/search')
      })
      .catch(error => console.error('Error', error));
  };

  render() {
    return (
      <div className="home_top_header" >
      <div id="placesSearch">
      <PlacesAutocomplete className="ui form"
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="ui inline form field" >
            <h2 className="search label">Search hospitals near you</h2>
            <input
              {...getInputProps({
                placeholder: 'Zip Code, City, State ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      </div>
      </div>
    );
  }
}

export default connect(null, {updateMapCenter, push})(MapPlacesSearch)
