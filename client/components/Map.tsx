import { useState, useEffect } from 'react'

interface MapProps {
  address: string
}

function Map({ address }: MapProps) {
  const [map, setMap] = useState<google.maps.Map>()
  const [userLocation, setUserLocation] = useState<google.maps.LatLng>()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const initMap = async () => {
      const directionsService = new google.maps.DirectionsService()
      const directionsRenderer = new google.maps.DirectionsRenderer()
      const geocoder = new google.maps.Geocoder()
      // Request user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            setUserLocation(new google.maps.LatLng(latitude, longitude))
          },
          (error) => {
            console.error('Error getting user location:', error)
          }
        )
      } else {
        console.error('Geolocation is not supported by this browser.')
      }

      // Geocode the specified address
      geocoder.geocode({ address }, function (results, status) {
        if (status === 'OK' && results !== null) {
          const center = results[0].geometry.location

          // Only create map if both address and userLocation are defined
          if (userLocation) {
            const newMap = new google.maps.Map(
              document.getElementById('map') as HTMLElement,
              {
                center: userLocation,
                zoom: 18,
              }
            )

            // Add marker for the specified address
            const addressMarker = new google.maps.Marker({
              position: center,
              map: newMap,
            })

            // Render directions from user's location to specified address
            directionsService.route(
              {
                origin: userLocation,
                destination: center,
                travelMode: google.maps.TravelMode.DRIVING,
              },
              (result, status) => {
                if (status === 'OK') {
                  directionsRenderer.setDirections(result)
                  directionsRenderer.setMap(newMap)
                } else {
                  console.error('Error rendering directions:', status, result)
                }
              }
            )

            setMap(newMap)
            setIsLoaded(true)
          }
        } else {
          console.error(
            'Geocode was not successful for the following reason: ' + status
          )
        }
      })
    }
    if (!isLoaded) {
      initMap()
    }
  }, [address, userLocation])

  return <div id="map" className="w-80 h-80" />
}

export default Map
