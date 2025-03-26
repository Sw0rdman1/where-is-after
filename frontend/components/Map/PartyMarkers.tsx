import React from 'react';
import { Party } from '@/hooks/useParties';
import { Marker } from 'react-native-maps'

interface Props {
    parties: Party[];
}

const PartyMarkers: React.FC<Props> = ({ parties }) => {
    return (
        <React.Fragment>
            {(parties) && parties.map(party => (
                <Marker
                    key={party._id}
                    coordinate={{
                        latitude: party.venue.location?.latitude,
                        longitude: party.venue.location?.longitude,
                    }}
                    title={party.name}
                    description={party.description}
                />
            ))}
        </React.Fragment>
    )
}

export default PartyMarkers