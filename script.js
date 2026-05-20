// Ambil semua slide asli
const allSlides = Array.from(document.querySelectorAll('.swiper-slide'));

// Inisialisasi Swiper
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0:   { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    992: { slidesPerView: 4 },
  }
});

// Klik card → buka website
document.getElementById('swiperWrapper').addEventListener('click', function (e) {
  const slide = e.target.closest('.swiper-slide');

  if (slide && slide.dataset.url) {
    window.open(slide.dataset.url, '_blank');
  }
});

// Fungsi filter
function filterKategori(kategori) {

  const wrapper = document.getElementById('swiperWrapper');
  const emptyState = document.getElementById('emptyState');

  // Kosongkan swiper
  wrapper.innerHTML = '';

  // Filter data
  const filtered = kategori === 'semua'
    ? allSlides
    : allSlides.filter(slide => slide.dataset.kategori === kategori);

  // Jika kosong
  if (filtered.length === 0) {
    emptyState.style.display = 'block';
    document.querySelector('.mySwiper').style.display = 'none';
  } else {

    emptyState.style.display = 'none';
    document.querySelector('.mySwiper').style.display = 'block';

    // Masukkan slide lagi
    filtered.forEach(slide => {
      wrapper.appendChild(slide);
    });

    // Update swiper
    swiper.update();
    swiper.slideTo(0);
  }
}

// Event tombol kategori
document.querySelectorAll('.kategori-btn').forEach(btn => {

  btn.addEventListener('click', function () {

    // Active button
    document.querySelectorAll('.kategori-btn')
      .forEach(b => b.classList.remove('active'));

    this.classList.add('active');

    // Jalankan filter
    filterKategori(this.dataset.kategori);

  });

});
   
 var map = L.map('map', {
            zoomControl:false, maxZoom:28, minZoom:1
        }).fitBounds([[0.4539686113595321,101.32943658450726],[0.5709006193797859,101.56116810243024]]);
        var hash = new L.Hash(map);
        map.attributionControl.setPrefix('<a href="https://github.com/qgis2web/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');
        var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});
        // remove popup's row if "visible-with-data"
        function removeEmptyRowsFromPopupContent(content, feature) {
         var tempDiv = document.createElement('div');
         tempDiv.innerHTML = content;
         var rows = tempDiv.querySelectorAll('tr');
         for (var i = 0; i < rows.length; i++) {
             var td = rows[i].querySelector('td.visible-with-data');
             var key = td ? td.id : '';
             if (td && td.classList.contains('visible-with-data') && feature.properties[key] == null) {
                 rows[i].parentNode.removeChild(rows[i]);
             }
         }
         return tempDiv.innerHTML;
        }
        // modify popup if contains media
        function addClassToPopupIfMedia(content, popup) {
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;
            var imgTd = tempDiv.querySelector('td img');
            if (imgTd) {
                var src = imgTd.getAttribute('src');
                if (/\.(jpg|jpeg|png|gif|bmp|webp|avif)$/i.test(src)) {
                    popup._contentNode.classList.add('media');
                    setTimeout(function() {
                        popup.update();
                    }, 10);
                } else if (/\.(mp3|wav|ogg|aac)$/i.test(src)) {
                    var audio = document.createElement('audio');
                    audio.controls = true;
                    audio.src = src;
                    imgTd.parentNode.replaceChild(audio, imgTd);
                    popup._contentNode.classList.add('media');
                    setTimeout(function() {
                        popup.setContent(tempDiv.innerHTML);
                        popup.update();
                    }, 10);
                } else if (/\.(mp4|webm|ogg|mov)$/i.test(src)) {
                    var video = document.createElement('video');
                    video.controls = true;
                    video.src = src;
                    video.style.width = "400px";
                    video.style.height = "300px";
                    video.style.maxHeight = "60vh";
                    video.style.maxWidth = "60vw";
                    imgTd.parentNode.replaceChild(video, imgTd);
                    popup._contentNode.classList.add('media');
                    // Aggiorna il popup quando il video carica i metadati
                    video.addEventListener('loadedmetadata', function() {
                        popup.update();
                    });
                    setTimeout(function() {
                        popup.setContent(tempDiv.innerHTML);
                        popup.update();
                    }, 10);
                } else {
                    popup._contentNode.classList.remove('media');
                }
            } else {
                popup._contentNode.classList.remove('media');
            }
        }
        var title = new L.Control({'position':'topright'});
        title.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
            return this._div;
        };
        title.update = function () {
            this._div.innerHTML = '<h2>SEBARAN PERGURUAN TINGGI DI WILAYAH KOTA PEKANBARU</h2>';
        };
        title.addTo(map);
        var abstract = new L.Control({'position':'bottomright'});
        abstract.onAdd = function (map) {
            this._div = L.DomUtil.create('div',
            'leaflet-control abstract');
            this._div.id = 'abstract'

                abstract.show();
                return this._div;
            };
            abstract.show = function () {
                this._div.classList.remove("abstract");
                this._div.classList.add("abstractUncollapsed");
                this._div.innerHTML = 'Peta ini memberikan informasi terkait sebaran Perguruan tinggi yanng terdapat di wilayah kota Pekanbaru. Sumber data diperoleh dari PDDIKTI dan datapendidikan.com. ';
        };
        abstract.addTo(map);
        var zoomControl = L.control.zoom({
            position: 'topleft'
        }).addTo(map);
        var bounds_group = new L.featureGroup([]);
        function setBounds() {
        }
        map.createPane('pane_CartoDbPositron_0');
        map.getPane('pane_CartoDbPositron_0').style.zIndex = 400;
        var layer_CartoDbPositron_0 = L.tileLayer('http://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
            pane: 'pane_CartoDbPositron_0',
            opacity: 1.0,
            attribution: '',
            minZoom: 1,
            maxZoom: 28,
            minNativeZoom: 0,
            maxNativeZoom: 20
        });
        layer_CartoDbPositron_0;
        map.addLayer(layer_CartoDbPositron_0);
        function pop_kepadatanperguruantinggiadministrasi_ar_kecamatan_1(feature, layer) {
            var popupContent = '<table>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['fid'] !== null ? autolinker.link(String(feature.properties['fid']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['OBJECTID'] !== null ? autolinker.link(String(feature.properties['OBJECTID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['NAMOBJ'] !== null ? autolinker.link(String(feature.properties['NAMOBJ']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['FCODE'] !== null ? autolinker.link(String(feature.properties['FCODE']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['REMARK'] !== null ? autolinker.link(String(feature.properties['REMARK']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['METADATA'] !== null ? autolinker.link(String(feature.properties['METADATA']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['SRS_ID'] !== null ? autolinker.link(String(feature.properties['SRS_ID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['KDBBPS'] !== null ? autolinker.link(String(feature.properties['KDBBPS']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['KDCBPS'] !== null ? autolinker.link(String(feature.properties['KDCBPS']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['KDCPUM'] !== null ? autolinker.link(String(feature.properties['KDCPUM']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['KDEBPS'] !== null ? autolinker.link(String(feature.properties['KDEBPS']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['KDEPUM'] !== null ? autolinker.link(String(feature.properties['KDEPUM']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['KDPBPS'] !== null ? autolinker.link(String(feature.properties['KDPBPS']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['KDPKAB'] !== null ? autolinker.link(String(feature.properties['KDPKAB']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['KDPPUM'] !== null ? autolinker.link(String(feature.properties['KDPPUM']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['LUASWH'] !== null ? autolinker.link(String(feature.properties['LUASWH']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['TIPADM'] !== null ? autolinker.link(String(feature.properties['TIPADM']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['WADMKC'] !== null ? autolinker.link(String(feature.properties['WADMKC']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['WADMKD'] !== null ? autolinker.link(String(feature.properties['WADMKD']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['WADMKK'] !== null ? autolinker.link(String(feature.properties['WADMKK']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['WADMPR'] !== null ? autolinker.link(String(feature.properties['WADMPR']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['WIADKC'] !== null ? autolinker.link(String(feature.properties['WIADKC']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['WIADKK'] !== null ? autolinker.link(String(feature.properties['WIADKK']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['WIADPR'] !== null ? autolinker.link(String(feature.properties['WIADPR']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['WIADKD'] !== null ? autolinker.link(String(feature.properties['WIADKD']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['UUPP'] !== null ? autolinker.link(String(feature.properties['UUPP']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['SHAPE_Length'] !== null ? autolinker.link(String(feature.properties['SHAPE_Length']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['SHAPE_Area'] !== null ? autolinker.link(String(feature.properties['SHAPE_Area']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['total'] !== null ? autolinker.link(String(feature.properties['total']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['kepadatan perguruan tinngi di kota pekanabruKode'] !== null ? autolinker.link(String(feature.properties['kepadatan perguruan tinngi di kota pekanabruKode']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['kepadatan perguruan tinngi di kota pekanabruNama Sekolah'] !== null ? autolinker.link(String(feature.properties['kepadatan perguruan tinngi di kota pekanabruNama Sekolah']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['kepadatan perguruan tinngi di kota pekanabruNama Singkat'] !== null ? autolinker.link(String(feature.properties['kepadatan perguruan tinngi di kota pekanabruNama Singkat']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['kepadatan perguruan tinngi di kota pekanabruAlamat'] !== null ? autolinker.link(String(feature.properties['kepadatan perguruan tinngi di kota pekanabruAlamat']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['kepadatan perguruan tinngi di kota pekanabruStatus'] !== null ? autolinker.link(String(feature.properties['kepadatan perguruan tinngi di kota pekanabruStatus']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['kepadatan perguruan tinngi di kota pekanabruJumlah Mahasiswa'] !== null ? autolinker.link(String(feature.properties['kepadatan perguruan tinngi di kota pekanabruJumlah Mahasiswa']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['kepadatan perguruan tinngi di kota pekanabruy_koor'] !== null ? autolinker.link(String(feature.properties['kepadatan perguruan tinngi di kota pekanabruy_koor']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['kepadatan perguruan tinngi di kota pekanabrux_koor'] !== null ? autolinker.link(String(feature.properties['kepadatan perguruan tinngi di kota pekanabrux_koor']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['kepadatan perguruan tinngi di kota pekanabruAkreditasi'] !== null ? autolinker.link(String(feature.properties['kepadatan perguruan tinngi di kota pekanabruAkreditasi']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                </table>';
            var content = removeEmptyRowsFromPopupContent(popupContent, feature);
			layer.on('popupopen', function(e) {
				addClassToPopupIfMedia(content, e.popup);
			});
			layer.bindPopup(content, { maxHeight: 400 });
        }

        function style_kepadatanperguruantinggiadministrasi_ar_kecamatan_1_0(feature) {
            if (feature.properties['total'] >= 0.000000 && feature.properties['total'] <= 0.000000 ) {
                return {
                pane: 'pane_kepadatanperguruantinggiadministrasi_ar_kecamatan_1',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(234,245,255,1.0)',
                interactive: false,
            }
            }
            if (feature.properties['total'] >= 0.000000 && feature.properties['total'] <= 1.000000 ) {
                return {
                pane: 'pane_kepadatanperguruantinggiadministrasi_ar_kecamatan_1',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(220,233,246,1.0)',
                interactive: false,
            }
            }
            if (feature.properties['total'] >= 1.000000 && feature.properties['total'] <= 2.000000 ) {
                return {
                pane: 'pane_kepadatanperguruantinggiadministrasi_ar_kecamatan_1',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(190,216,236,1.0)',
                interactive: false,
            }
            }
            if (feature.properties['total'] >= 2.000000 && feature.properties['total'] <= 3.000000 ) {
                return {
                pane: 'pane_kepadatanperguruantinggiadministrasi_ar_kecamatan_1',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(143,194,222,1.0)',
                interactive: false,
            }
            }
            if (feature.properties['total'] >= 3.000000 && feature.properties['total'] <= 4.000000 ) {
                return {
                pane: 'pane_kepadatanperguruantinggiadministrasi_ar_kecamatan_1',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(91,163,208,1.0)',
                interactive: false,
            }
            }
            if (feature.properties['total'] >= 4.000000 && feature.properties['total'] <= 5.000000 ) {
                return {
                pane: 'pane_kepadatanperguruantinggiadministrasi_ar_kecamatan_1',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(50,130,190,1.0)',
                interactive: false,
            }
            }
            if (feature.properties['total'] >= 5.000000 && feature.properties['total'] <= 6.000000 ) {
                return {
                pane: 'pane_kepadatanperguruantinggiadministrasi_ar_kecamatan_1',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(17,92,165,1.0)',
                interactive: false,
            }
            }
            if (feature.properties['total'] >= 6.000000 && feature.properties['total'] <= 8.000000 ) {
                return {
                pane: 'pane_kepadatanperguruantinggiadministrasi_ar_kecamatan_1',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(47,78,124,1.0)',
                interactive: false,
            }
            }
        }
        map.createPane('pane_kepadatanperguruantinggiadministrasi_ar_kecamatan_1');
        map.getPane('pane_kepadatanperguruantinggiadministrasi_ar_kecamatan_1').style.zIndex = 401;
        map.getPane('pane_kepadatanperguruantinggiadministrasi_ar_kecamatan_1').style['mix-blend-mode'] = 'normal';
        var layer_kepadatanperguruantinggiadministrasi_ar_kecamatan_1 = new L.geoJson(json_kepadatanperguruantinggiadministrasi_ar_kecamatan_1, {
            attribution: '',
            interactive: false,
            dataVar: 'json_kepadatanperguruantinggiadministrasi_ar_kecamatan_1',
            layerName: 'layer_kepadatanperguruantinggiadministrasi_ar_kecamatan_1',
            pane: 'pane_kepadatanperguruantinggiadministrasi_ar_kecamatan_1',
            onEachFeature: pop_kepadatanperguruantinggiadministrasi_ar_kecamatan_1,
            style: style_kepadatanperguruantinggiadministrasi_ar_kecamatan_1_0,
        });
        bounds_group.addLayer(layer_kepadatanperguruantinggiadministrasi_ar_kecamatan_1);
        map.addLayer(layer_kepadatanperguruantinggiadministrasi_ar_kecamatan_1);
        
        function pop_DataPerguruanTinggi_2(feature, layer) {
            var popupContent =  


            '<table>\
                    <tr>\
                        <th scope="row">Kode</th>\
                        <td>' + (feature.properties['Kode'] !== null ? autolinker.link(String(feature.properties['Kode']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Alamat</th>\
                        <td>' + (feature.properties['Alamat'] !== null ? autolinker.link(String(feature.properties['Alamat']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Kecamatan</th>\
                        <td>' + (feature.properties['Kecamatan'] !== null ? autolinker.link(String(feature.properties['Kecamatan']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Status</th>\
                        <td>' + (feature.properties['Status'] !== null ? autolinker.link(String(feature.properties['Status']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Jumlah Mahasiswa</th>\
                        <td>' + (feature.properties['Jumlah Mahasiswa'] !== null ? autolinker.link(String(feature.properties['Jumlah Mahasiswa']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Akreditasi</th>\
                        <td>' + (feature.properties['Akreditasi'] !== null ? autolinker.link(String(feature.properties['Akreditasi']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                </table>';
            var content = removeEmptyRowsFromPopupContent(popupContent, feature);
			layer.on('popupopen', function(e) {
				addClassToPopupIfMedia(content, e.popup);
			});
			layer.bindPopup(content, { maxHeight: 400 });
        }

        function style_DataPerguruanTinggi_2_0() {
            return {
                pane: 'pane_DataPerguruanTinggi_2',
                interactive: true,
            }
        }
        map.createPane('pane_DataPerguruanTinggi_2');
        map.getPane('pane_DataPerguruanTinggi_2').style.zIndex = 402;
        map.getPane('pane_DataPerguruanTinggi_2').style['mix-blend-mode'] = 'normal';
        
        var customIcon = L.icon({
            iconUrl: 'map/markers/icon.png',
            iconSize: [35, 35],
            iconAnchor: [17, 35],
            popupAnchor: [0, -35]
        });
        
        var layer_DataPerguruanTinggi_2 = new L.geoJson(json_DataPerguruanTinggi_2, {
            attribution: '',
            interactive: true,
            dataVar: 'json_DataPerguruanTinggi_2',
            layerName: 'layer_DataPerguruanTinggi_2',
            pane: 'pane_DataPerguruanTinggi_2',
            onEachFeature: pop_DataPerguruanTinggi_2,
            pointToLayer: function (feature, latlng) {
                var context = {
                    feature: feature,
                    variables: {}
                };
               return L.marker(latlng, {
                    icon: customIcon
                });
            },
        });
        bounds_group.addLayer(layer_DataPerguruanTinggi_2);
        map.addLayer(layer_DataPerguruanTinggi_2);
        function pop_JalanArteri_3(feature, layer) {
            var popupContent = '<table>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['OBJECTID'] !== null ? autolinker.link(String(feature.properties['OBJECTID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['NAMOBJ'] !== null ? autolinker.link(String(feature.properties['NAMOBJ']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['FCODE'] !== null ? autolinker.link(String(feature.properties['FCODE']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['REMARK'] !== null ? autolinker.link(String(feature.properties['REMARK']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['METADATA'] !== null ? autolinker.link(String(feature.properties['METADATA']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['SRS_ID'] !== null ? autolinker.link(String(feature.properties['SRS_ID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['ARHRJL'] !== null ? autolinker.link(String(feature.properties['ARHRJL']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['AUTRJL'] !== null ? autolinker.link(String(feature.properties['AUTRJL']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['FGSRJL'] !== null ? autolinker.link(String(feature.properties['FGSRJL']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['JARRJL'] !== null ? autolinker.link(String(feature.properties['JARRJL']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['JPARJL'] !== null ? autolinker.link(String(feature.properties['JPARJL']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['KLLRJL'] !== null ? autolinker.link(String(feature.properties['KLLRJL']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['KONRJL'] !== null ? autolinker.link(String(feature.properties['KONRJL']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['KPMSTR'] !== null ? autolinker.link(String(feature.properties['KPMSTR']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['LKONOF'] !== null ? autolinker.link(String(feature.properties['LKONOF']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['LKSBSP'] !== null ? autolinker.link(String(feature.properties['LKSBSP']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['LKSRTA'] !== null ? autolinker.link(String(feature.properties['LKSRTA']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['LLHRRT'] !== null ? autolinker.link(String(feature.properties['LLHRRT']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['LOCRJL'] !== null ? autolinker.link(String(feature.properties['LOCRJL']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['LBRBHJ'] !== null ? autolinker.link(String(feature.properties['LBRBHJ']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['LBRJLN'] !== null ? autolinker.link(String(feature.properties['LBRJLN']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['MATRJL'] !== null ? autolinker.link(String(feature.properties['MATRJL']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['MEDRJL'] !== null ? autolinker.link(String(feature.properties['MEDRJL']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['SPCRJL'] !== null ? autolinker.link(String(feature.properties['SPCRJL']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['STARJL'] !== null ? autolinker.link(String(feature.properties['STARJL']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['TOLRJL'] !== null ? autolinker.link(String(feature.properties['TOLRJL']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['UTKRJL'] !== null ? autolinker.link(String(feature.properties['UTKRJL']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['VLCPRT'] !== null ? autolinker.link(String(feature.properties['VLCPRT']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['WLYRJL'] !== null ? autolinker.link(String(feature.properties['WLYRJL']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['TGL_SK'] !== null ? autolinker.link(String(feature.properties['TGL_SK']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['JLNLYG'] !== null ? autolinker.link(String(feature.properties['JLNLYG']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['KLSRJL'] !== null ? autolinker.link(String(feature.properties['KLSRJL']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['Shape_Length'] !== null ? autolinker.link(String(feature.properties['Shape_Length']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                </table>';
            var content = removeEmptyRowsFromPopupContent(popupContent, feature);
			layer.on('popupopen', function(e) {
				addClassToPopupIfMedia(content, e.popup);
			});
			layer.bindPopup(content, { maxHeight: 400 });
        }

        function style_JalanArteri_3_0() {
            return {
                pane: 'pane_JalanArteri_3',
                opacity: 1,
                color: 'rgba(231,113,72,1.0)',
                dashArray: '',
                lineCap: 'square',
                lineJoin: 'bevel',
                weight: 2.0,
                fillOpacity: 0,
                interactive: false,
            }
        }
        map.createPane('pane_JalanArteri_3');
        map.getPane('pane_JalanArteri_3').style.zIndex = 403;
        map.getPane('pane_JalanArteri_3').style['mix-blend-mode'] = 'normal';
        var layer_JalanArteri_3 = new L.geoJson(json_JalanArteri_3, {
            attribution: '',
            interactive: false,
            dataVar: 'json_JalanArteri_3',
            layerName: 'layer_JalanArteri_3',
            pane: 'pane_JalanArteri_3',
            onEachFeature: pop_JalanArteri_3,
            style: style_JalanArteri_3_0,
        });
        bounds_group.addLayer(layer_JalanArteri_3);
        map.addLayer(layer_JalanArteri_3);
        function pop_BatasWilayahKotaPekanbaru_4(feature, layer) {
            var popupContent = '<table>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['OBJECTID'] !== null ? autolinker.link(String(feature.properties['OBJECTID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['NAMOBJ'] !== null ? autolinker.link(String(feature.properties['NAMOBJ']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['FCODE'] !== null ? autolinker.link(String(feature.properties['FCODE']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['REMARK'] !== null ? autolinker.link(String(feature.properties['REMARK']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['METADATA'] !== null ? autolinker.link(String(feature.properties['METADATA']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['SRS_ID'] !== null ? autolinker.link(String(feature.properties['SRS_ID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['ADMIN1'] !== null ? autolinker.link(String(feature.properties['ADMIN1']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['ADMIN2'] !== null ? autolinker.link(String(feature.properties['ADMIN2']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['KARKTR'] !== null ? autolinker.link(String(feature.properties['KARKTR']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['KLBADM'] !== null ? autolinker.link(String(feature.properties['KLBADM']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['PJGBTS'] !== null ? autolinker.link(String(feature.properties['PJGBTS']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['STSBTS'] !== null ? autolinker.link(String(feature.properties['STSBTS']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['TIPLOK'] !== null ? autolinker.link(String(feature.properties['TIPLOK']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['TIPTBT'] !== null ? autolinker.link(String(feature.properties['TIPTBT']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['UUPP'] !== null ? autolinker.link(String(feature.properties['UUPP']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['WADKC1'] !== null ? autolinker.link(String(feature.properties['WADKC1']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['WADKC2'] !== null ? autolinker.link(String(feature.properties['WADKC2']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['WAKBK1'] !== null ? autolinker.link(String(feature.properties['WAKBK1']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['WAKBK2'] !== null ? autolinker.link(String(feature.properties['WAKBK2']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['WAKLD1'] !== null ? autolinker.link(String(feature.properties['WAKLD1']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['WAKLD2'] !== null ? autolinker.link(String(feature.properties['WAKLD2']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['WAPRO1'] !== null ? autolinker.link(String(feature.properties['WAPRO1']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['WAPRO2'] !== null ? autolinker.link(String(feature.properties['WAPRO2']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['RuleID'] !== null ? autolinker.link(String(feature.properties['RuleID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['Override'] !== null ? autolinker.link(String(feature.properties['Override']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['Shape_Length'] !== null ? autolinker.link(String(feature.properties['Shape_Length']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                </table>';
            var content = removeEmptyRowsFromPopupContent(popupContent, feature);
			layer.on('popupopen', function(e) {
				addClassToPopupIfMedia(content, e.popup);
			});
			layer.bindPopup(content, { maxHeight: 400 });
        }

        function style_BatasWilayahKotaPekanbaru_4_0() {
            return {
                pane: 'pane_BatasWilayahKotaPekanbaru_4',
                opacity: 1,
                color: 'rgba(64,84,84,1.0)',
                dashArray: '',
                lineCap: 'square',
                lineJoin: 'bevel',
                weight: 2.0,
                fillOpacity: 0,
                interactive: false,
            }
        }
        map.createPane('pane_BatasWilayahKotaPekanbaru_4');
        map.getPane('pane_BatasWilayahKotaPekanbaru_4').style.zIndex = 404;
        map.getPane('pane_BatasWilayahKotaPekanbaru_4').style['mix-blend-mode'] = 'normal';
        var layer_BatasWilayahKotaPekanbaru_4 = new L.geoJson(json_BatasWilayahKotaPekanbaru_4, {
            attribution: '',
            interactive: false,
            dataVar: 'json_BatasWilayahKotaPekanbaru_4',
            layerName: 'layer_BatasWilayahKotaPekanbaru_4',
            pane: 'pane_BatasWilayahKotaPekanbaru_4',
            onEachFeature: pop_BatasWilayahKotaPekanbaru_4,
            style: style_BatasWilayahKotaPekanbaru_4_0,
        });
        bounds_group.addLayer(layer_BatasWilayahKotaPekanbaru_4);
        map.addLayer(layer_BatasWilayahKotaPekanbaru_4);
        var overlaysTree = [
            {label: '<img src="map/legend/BatasWilayahKotaPekanbaru_4.png" /> Batas Wilayah Kota Pekanbaru ', layer: layer_BatasWilayahKotaPekanbaru_4},
            {label: '<img src="map/legend/JalanArteri_3.png" /> Jalan Arteri ', layer: layer_JalanArteri_3},
            {label: '<img src="map/legend/DataPerguruanTinggi_2.png" /> Data Perguruan Tinggi', layer: layer_DataPerguruanTinggi_2},
            {label: 'kepadatan perguruan tinggi — administrasi_ar_kecamatan<br /><table><tr><td style="text-align: center;"><img src="map/legend/kepadatanperguruantinggiadministrasi_ar_kecamatan_1_TidakTerdapatperguruanTinggi0.png" /></td><td>Tidak Terdapat perguruan Tinggi</td></tr><tr><td style="text-align: center;"><img src="map/legend/kepadatanperguruantinggiadministrasi_ar_kecamatan_1_1PerguruanTinggi1.png" /></td><td>1 Perguruan Tinggi</td></tr><tr><td style="text-align: center;"><img src="map/legend/kepadatanperguruantinggiadministrasi_ar_kecamatan_1_2PerguruanTinggi2.png" /></td><td>2 Perguruan Tinggi</td></tr><tr><td style="text-align: center;"><img src="map/legend/kepadatanperguruantinggiadministrasi_ar_kecamatan_1_3PerguruanTinggi3.png" /></td><td>3 Perguruan Tinggi</td></tr><tr><td style="text-align: center;"><img src="map/legend/kepadatanperguruantinggiadministrasi_ar_kecamatan_1_4PerguruanTinggi4.png" /></td><td>4 Perguruan Tinggi</td></tr><tr><td style="text-align: center;"><img src="map/legend/kepadatanperguruantinggiadministrasi_ar_kecamatan_1_5PerguruanTinggi5.png" /></td><td>5 Perguruan Tinggi</td></tr><tr><td style="text-align: center;"><img src="map/legend/kepadatanperguruantinggiadministrasi_ar_kecamatan_1_6PerguruanTinggi6.png" /></td><td>6 Perguruan Tinggi</td></tr><tr><td style="text-align: center;"><img src="map/legend/kepadatanperguruantinggiadministrasi_ar_kecamatan_1_8PerguruanTinggi7.png" /></td><td>8 Perguruan Tinggi</td></tr></table>', layer: layer_kepadatanperguruantinggiadministrasi_ar_kecamatan_1},
            {label: "CartoDb Positron", layer: layer_CartoDbPositron_0},]
        var lay = L.control.layers.tree(null, overlaysTree,{
            //namedToggle: true,
            //selectorBack: false,
            //closedSymbol: '&#8862; &#x1f5c0;',
            //openedSymbol: '&#8863; &#x1f5c1;',
            //collapseAll: 'Collapse all',
            //expandAll: 'Expand all',
            collapsed: true,
        });
        lay.addTo(map);
        setBounds();
        var i = 0;
        layer_kepadatanperguruantinggiadministrasi_ar_kecamatan_1.eachLayer(function(layer) {
            var context = {
                feature: layer.feature,
                variables: {}
            };
            layer.bindTooltip((layer.feature.properties['NAMOBJ'] !== null?String('<div style="color: #ffffff; font-size: 14pt; font-weight: bold; font-family: \'Sitka Small Semibold\', sans-serif;">' + layer.feature.properties['NAMOBJ']) + '</div>':''), {permanent: true, offset: [-0, -16], className: 'css_kepadatanperguruantinggiadministrasi_ar_kecamatan_1'});
            labels.push(layer);
            totalMarkers += 1;
              layer.added = true;
              addLabel(layer, i);
              i++;
        });
        var i = 0;
        layer_DataPerguruanTinggi_2.eachLayer(function(layer) {
            var context = {
                feature: layer.feature,
                variables: {}
            };
            layer.bindTooltip((layer.feature.properties['Nama Singkat'] !== null?String('<div style="color: #323232; font-size: 10pt; font-family: \'Sitka Banner\', sans-serif;">' + layer.feature.properties['Nama Singkat']) + '</div>':''), {permanent: true, offset: [-0, -16], className: 'css_DataPerguruanTinggi_2'});
            labels.push(layer);
            totalMarkers += 1;
              layer.added = true;
              addLabel(layer, i);
              i++;
        });
        resetLabels([layer_kepadatanperguruantinggiadministrasi_ar_kecamatan_1,layer_DataPerguruanTinggi_2]);
        map.on("zoomend", function(){
            resetLabels([layer_kepadatanperguruantinggiadministrasi_ar_kecamatan_1,layer_DataPerguruanTinggi_2]);
        });
        map.on("layeradd", function(){
            resetLabels([layer_kepadatanperguruantinggiadministrasi_ar_kecamatan_1,layer_DataPerguruanTinggi_2]);
        });
        map.on("layerremove", function(){
            resetLabels([layer_kepadatanperguruantinggiadministrasi_ar_kecamatan_1,layer_DataPerguruanTinggi_2]);
        });