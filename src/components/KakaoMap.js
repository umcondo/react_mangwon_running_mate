import React, { useEffect, useCallback, useRef } from "react";

const { kakao } = window;

const KakaoMap = ({ coordinates, resultIndex }) => {
  const mapRef = useRef();
  // 브라우저 리사이즈 시 좌표맵 이동시키기 위해 전역변수 설정
  var map = "";
  let CENTER_POINT = "";

  /*  현위치 버튼  */
  let la = 0; // 현재 위도 초기화
  let lo = 0; // 현재 경도 초기화

  const OPTIONS = {
    enableHighAccuracy: true, // 실제 위치와의 오차 - 단위 M
    timeout: 1000, // 위치를 반환하는데 걸리는 최대시간 (5초)
    maximumAge: 0, // 항상 실시간 위치정보를 가져옴
  };

  const MARKER_BOX = [];

  useEffect(() => {
    /* 지도 생성 */
    const mapCoordinates = coordinates[resultIndex].track;
    const MapCenter = coordinates[resultIndex].MapCenter;

    runningCourse(mapCoordinates, MapCenter);
  }, [coordinates, resultIndex]);

  function runningCourse(coordinates, MapCenter) {
    /* 지도 생성 */
    var mapContainer = mapRef.current, // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(MapCenter.lng, MapCenter.lat), // 지도의 중심좌표
        level: MapCenter.mapDepthLevel, // 지도의 확대 레벨
      };

    CENTER_POINT = new kakao.maps.LatLng(MapCenter.lng, MapCenter.lat);

    map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 마우스 드래그와 모바일 터치를 이용한 지도 이동을 막는다
    map.setDraggable(false);

    // 마우스 휠과 모바일 터치를 이용한 지도 확대, 축소를 막는다
    map.setZoomable(false);

    /* 러닝 코스 점찍고, 선연결 */
    var linePath = []; // 러닝 코스
    let distanceOverlay = "";

    // 모든 좌표 점찍기
    for (let i = 0; i < coordinates.length; i++) {
      var circleOverlay = new kakao.maps.CustomOverlay({
        content: '<span class="dot"></span>',
        position: new kakao.maps.LatLng(coordinates[i].lng, coordinates[i].lat),
        zIndex: 1,
      });

      // 모든 좌표를 러닝 코스가 입력
      linePath.push(
        new kakao.maps.LatLng(coordinates[i].lng, coordinates[i].lat)
      );

      // 지도에 표시할 선을 생성합니다
      var polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열 입니다
        endArrow: true,
        strokeWeight: 7, // 선의 두께 입니다
        strokeColor: "red", // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "solid", // 선의 스타일입니다
      });

      // 현재 좌표까지의 거리
      let distance = Math.round(polyline.getLength());

      // 현재 좌표의 이름
      let spotName = coordinates[i].coordinatesName;

      // 현재 좌표에 거리, 이름 표시
      if (coordinates[i].display === "y") {
        // display가 y일때만 오버레이 표시
        distanceOverlay = new kakao.maps.CustomOverlay({
          map: map, // 커스텀오버레이를 표시할 지도입니다
          content:
            '<div class="dotOverlay">' +
            `<div style="text-align:center">` +
            spotName +
            `</div>` +
            `거리 <span class="number">` +
            Math.round((distance / 1000) * 10) / 10 +
            `</span> km</div>`, // 커스텀오버레이에 표시할 내용입니다
          position: new kakao.maps.LatLng(
            coordinates[i].lng,
            coordinates[i].lat
          ), // 커스텀오버레이를 표시할 위치입니다.
          xAnchor: 0,
          yAnchor: 0,
          zIndex: 3,
        });
        // 지도에 표시합니다
        circleOverlay.setMap(map);
      }
    }

    // 지도에 선을 표시합니다
    polyline.setMap(map);

    var distance = Math.round(polyline.getLength()), // 선의 총 거리를 계산합니다
      content = getTimeHTML(distance); // 커스텀오버레이에 추가될 내용입니다

    distanceOverlay = new kakao.maps.CustomOverlay({
      map: map, // 커스텀오버레이를 표시할 지도입니다
      content: content, // 커스텀오버레이에 표시할 내용입니다
      position: new kakao.maps.LatLng(
        coordinates[coordinates.length - 1].lng,
        coordinates[coordinates.length - 1].lat
      ), // 커스텀오버레이를 표시할 위치입니다.
      xAnchor: 0,
      yAnchor: 0,
      zIndex: 3,
    });
    // 지도에 커스텀오버레이를 표시합니다
    distanceOverlay.setMap(map);

    /* 총거리, 소요시간 오버레이 생성 */
    mapContainer.appendChild(content);

    /* 출발,도착 마커 */
    var startMarker =
      coordinates[0].lng === coordinates[coordinates.length - 1].lng
        ? new kakao.maps.Point(15, 70)
        : new kakao.maps.Point(15, 45);

    var startSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png", // 출발 마커이미지의 주소입니다
      startSize = new kakao.maps.Size(50, 45), // 출발 마커이미지의 크기입니다
      startOption = {
        offset: startMarker, // 출발 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
      };

    // 출발 마커 이미지를 생성합니다
    var startImage = new kakao.maps.MarkerImage(
      startSrc,
      startSize,
      startOption
    );

    // 출발 마커가 표시될 위치입니다
    var startPosition = new kakao.maps.LatLng(
      coordinates[0].lng,
      coordinates[0].lat
    );

    // 출발 마커를 생성합니다
    startMarker = new kakao.maps.Marker({
      map: map, // 출발 마커가 지도 위에 표시되도록 설정합니다
      position: startPosition,
      image: startImage, // 출발 마커이미지를 설정합니다
    });

    startMarker.setImage(startImage);

    var arriveSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png", // 도착 마커이미지 주소입니다
      arriveSize = new kakao.maps.Size(50, 45), // 도착 마커이미지의 크기입니다
      arriveOption = {
        offset: new kakao.maps.Point(15, 45), // 도착 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
      };

    // 도착 마커 이미지를 생성합니다
    var arriveImage = new kakao.maps.MarkerImage(
      arriveSrc,
      arriveSize,
      arriveOption
    );

    // 도착 마커가 표시될 위치입니다
    var arrivePosition = new kakao.maps.LatLng(
      coordinates[coordinates.length - 1].lng,
      coordinates[coordinates.length - 1].lat
    );
    // 도착 마커를 생성합니다
    var arriveMarker = new kakao.maps.Marker({
      map: map, // 도착 마커가 지도 위에 표시되도록 설정합니다
      position: arrivePosition,
      image: arriveImage, // 도착 마커이미지를 설정합니다
    });

    arriveMarker.setImage(arriveImage);

    // 출발 마커, 도착 마커의 z-index 조정
    document.querySelector(
      "#map > div:nth-child(5) > div > div:nth-child(6) > div:nth-last-child(2)"
    ).style.zIndex = 3;
    document.querySelector(
      "#map > div:nth-child(5) > div > div:nth-child(6) > div:nth-last-child(1)"
    ).style.zIndex = 4;
  }

  function getTimeHTML(distance) {
    // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
    var walkTime = (distance / 67) | 0;
    var walkHour = "",
      walkMin = "";

    // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
    if (walkTime > 60) {
      walkHour =
        '<span class="number">' + Math.floor(walkTime / 60) + "</span>시간 ";
    }
    walkMin = '<span class="number">' + (walkTime % 60) + "</span> 분";

    // 달리기 평균 시속은 10km/h 이고 이것을 기준으로 달리기 분속은 167m/min입니다
    var runningTime = (distance / 167) | 0;
    var runningHour = "",
      runningMin = "";

    // 계산한 달리기 시간이 60분 보다 크면 시간으로 표출합니다
    if (runningTime > 60) {
      runningHour =
        '<span class="number">' + Math.floor(runningTime / 60) + "</span>시간 ";
    }
    runningMin = '<span class="number">' + (runningTime % 60) + "</span> 분";

    distance = Math.round((distance / 1000) * 100) / 100;
    // 거리와 도보 시간, 달리기 시간을 가지고 HTML Content를 만들어 리턴합니다

    var content = '<ul class="dotOverlay distanceInfo">';
    content += "    <li>";
    content +=
      '        <span class="label">총거리</span><span class="number">' +
      distance +
      " </span>km";
    content += "    </li>";
    content += "    <li>";
    content += '        <span class="label">도보</span>' + walkHour + walkMin;
    content += "    </li>";
    content += "    <li>";
    content +=
      '        <span class="label">달리기</span>' + runningHour + runningMin;
    content += "    </li>";
    content += "    <li>";
    content += "        <span>** 10km/h 기준 **</span>";
    content += "    </li>";
    content += "</ul>";

    var contentContainer = document.createElement("article");
    contentContainer.innerHTML = content;

    // 모바일 결과페이지 추가
    var courseTimeInfo = '<ul class="courseTimeInfo">';
    courseTimeInfo += "    <li>";
    courseTimeInfo +=
      '        <span class="label">거리<br></span><span class="number">' +
      distance +
      " </span>km";
    courseTimeInfo += "    </li>";
    courseTimeInfo += "    <li>";
    courseTimeInfo +=
      '        <span class="label">도보<br></span>' + walkHour + walkMin;
    courseTimeInfo += "    </li>";
    courseTimeInfo += "    <li>";
    courseTimeInfo +=
      '        <span class="label">러닝(10km/h)<br></span>' +
      runningHour +
      runningMin;
    courseTimeInfo += "</ul>";

    const ul = document.createElement("div");
    ul.innerHTML = courseTimeInfo;
    document.querySelector(".result_text").prepend(ul);

    return contentContainer;
  }

  // 오버레이 토글
  function toggleBtn() {
    document
      .querySelectorAll(
        "#map > div:nth-child(n) > div > div:nth-child(6) > div:nth-child(n) > div"
      )
      .forEach((elm) => elm.classList.toggle("toggle"));
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, error, OPTIONS);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  function showPosition(position) {
    la = position.coords.latitude;
    lo = position.coords.longitude;

    // 스무스하게 맵 이동
    panTo();

    // 현 위치 맵 마커 만들기
    currentMarker();
  }

  function currentLocation() {
    // 현위치 찾기
    getLocation();
  }

  function panTo() {
    // 이동할 위도 경도 위치를 생성합니다
    var moveLatLon = new kakao.maps.LatLng(la, lo);

    CENTER_POINT = new kakao.maps.LatLng(la, lo);
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);
  }

  /* 현위치 마커 */
  function currentMarker() {
    // 마커가 표시될 위치입니다

    var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/2018/mw/m640/ico_marker.png", // 마커이미지의 주소입니다
      // var imageSrc = "./../img/circle-dot-solid.svg", // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(30, 30), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(15, 15) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      ),
      markerPosition = new kakao.maps.LatLng(la, lo); // 마커가 표시될 위치입니다

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage, // 마커이미지 설정
    });

    MARKER_BOX.push(marker);

    // 현재 마커빼고 다 삭제
    MARKER_BOX.forEach((elm) => elm.setMap(null));
    // 마커가 지도 위에 표시되도록 설정합니다
    MARKER_BOX[MARKER_BOX.length - 1].setMap(map);
  }

  // 지도타입 컨트롤의 지도 또는 스카이뷰 버튼을 클릭하면 호출되어 지도타입을 바꾸는 함수입니다
  function setMapType(maptype) {
    var roadmapControl = document.getElementById("btnRoadmap");
    var skyviewControl = document.getElementById("btnSkyview");
    if (maptype === "roadmap") {
      map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
      roadmapControl.className = "selected_btn";
      skyviewControl.className = "btn";
    } else {
      map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
      skyviewControl.className = "selected_btn";
      roadmapControl.className = "btn";
    }
  }

  // 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
  function zoomIn() {
    map.setLevel(map.getLevel() - 1);
  }

  // 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
  function zoomOut() {
    map.setLevel(map.getLevel() + 1);
  }

  //브라우저 리사이즈시 좌표맵 중심 이동
  window.addEventListener("resize", () => {
    if (map) {
      map.panTo(CENTER_POINT);
    }
  });

  return (
    <div ref={mapRef} id="map" className="map_style">
      <div className="pointToggleBtn map_btn_zIndex">
        <button
          id="toggle_btn"
          className="overlay_toggle_btn"
          onClick={toggleBtn}
        >
          거점숨기기
        </button>
      </div>
      {/* 현위치 버튼 */}
      <div className="currentLocationContainer map_btn_zIndex">
        <button className="current_location_btn" onClick={currentLocation}>
          <i className="fa-solid fa-location-crosshairs"></i>
        </button>
      </div>

      {/*  지도타입 컨트롤 버튼 */}
      <div className="custom_typecontrol radius_border map_btn_zIndex">
        <span
          id="btnRoadmap"
          className="selected_btn"
          onClick={() => {
            setMapType("roadmap");
          }}
        >
          지도
        </span>
        <span
          id="btnSkyview"
          className="btn"
          onClick={() => {
            setMapType("skyview");
          }}
        >
          스카이뷰
        </span>
      </div>
      {/* 지도 확대, 축소 컨트롤 버튼 */}
      <div className="custom_zoomcontrol radius_border map_btn_zIndex">
        <span onClick={zoomIn}>
          <img
            src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
            alt="확대"
          />
        </span>
        <span onClick={zoomOut}>
          <img
            src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
            alt="축소"
          />
        </span>
      </div>
    </div>
  );
};

export default KakaoMap;
