import classNames from 'classnames/bind';
import styles from '@components/sections/Map.module.scss';
import { useRef } from 'react';
import Section from '@shared/Section';
import { useEffect } from 'react';
import { Location } from '@models/wedding';

declare global {
  interface Window {
    kakao: any;
  }
}
const cx = classNames.bind(styles);

function Map({ location }: { location: Location }) {
  const mapContainer = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}&autoload=false`;
    script.async = true;

    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const position = new window.kakao.maps.LatLng(
          location.lat,
          location.lng,
        );

        const options = {
          center: position,
          level: 3,
        };

        const marker = new window.kakao.maps.Marker({
          position,
        });

        const map = new window.kakao.maps.Map(mapContainer.current, options);
        marker.setMap(map);
      });
    };
  }, [location.lat, location.lng]);

  return (
    <Section
      title={
        <div className={cx('wrap-header')}>
          <span className={cx('txt-title')}>오시는길</span>
          <span className={cx('txt-subtitle')}>{location.name}</span>
          <span className={cx('txt-subtitle')}>{location.address}</span>
        </div>
      }
    >
      <div className={cx('wrap-map')}>
        <div className={cx('map')} ref={mapContainer}></div>
        <a className={cx('btn-find-way')} href={location.link} target="blank">
          길찾기
        </a>
      </div>

      <div>
        <WayToCome label="버스" list={location.waytocome.bus} />
        <WayToCome label="지하철" list={location.waytocome.metro} />
      </div>
    </Section>
  );
}

function WayToCome({
  label,
  list,
}: {
  label: React.ReactNode;
  list: string[];
}) {
  return (
    <div className={cx('wrap-waytocome')}>
      <div className={cx('txt-label')}>{label}</div>
      <ul>
        {list.map((waytocome) => (
          <li>{waytocome}</li>
        ))}
      </ul>
    </div>
  );
}

export default Map;
