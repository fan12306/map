/* eslint-disable */
export const util = {
  isDeviation: true,
  PI: 3.14159265358979324,
  x_pi: 3.14159265358979324 * 3000.0 / 180.0,
  // geometryFactory: new jsts.geom.GeometryFactory(),
  jstsDistance: 0.00000001,
  // projection900913: new ol.proj.Projection({
  //   code: 'EPSG:900913',
  //   extent: ol.proj.get('EPSG:900913').getExtent()
  // }),
  // projection4326: new ol.proj.Projection({
  //   code: 'EPSG:4326'
  // }),
  cor900913: 3,
  cor4326_s: 1,
  cor4326_h: 2,
  transLonlatArr: function(arr, scor, tcor) { //坐标转化   
    var obj = {};
    obj.cor = tcor;
    // if (scor == tcor) { //相同坐标不转为
    //   obj.arr = arr;
    // } else 
    if (scor === 1 && tcor === 2) { //标准坐标4326转为火星坐标4326
      obj.arr = util.corToArr(arr, true);
    } else if (scor === 2 && tcor === 1) { //火星坐标转4326为标准坐标4326
      obj.arr = util.corFromArr(arr, true);
    }
    // else if (scor == 1 && tcor == 3) { //标准坐标4326转为900913，中间要用火星坐标
    //   //obj.arr = util.transto9(arr);
    //   obj.arr = util.transLonlatArr(arr, 1, 2).arr;
    //   obj.arr = util.transto9(obj.arr);
    // } 
    // else if (scor == 3 && tcor == 1) { //900913转为标准坐标4326，中间要用火星坐标
    //   //obj.arr = util.transfrom9(arr);
    //   obj.arr = util.transfrom9(arr);
    //   obj.arr = util.transLonlatArr(obj.arr, 1, 2).arr;
    // } 
    // else if (scor == 2 && tcor == 3) { //火星坐标4326转为900913
    //   //obj.arr = util.transLonlatArr(arr, 2, 1).arr;
    //   //obj.arr = util.transto9(obj.arr);
    //   obj.arr = util.transto9(arr);
    // } 
    // else if (scor == 3 && tcor == 2) { //900913转为火星坐标4326
    //   //obj.arr = util.transfrom9(arr);
    //   //obj.arr = util.transLonlatArr(obj.arr, 2, 1).arr;
    //   obj.arr = util.transfrom9(arr);
    // } 
    else if (scor === 1 && tcor === 1) { //标准坐标到百度坐标
      obj.arr = util.corToArr(arr, true);
      obj.arr = util.transLonlatArr(obj.arr, 2, 2).arr;
    } else if (scor === 2 && tcor === 2) { //火星坐标到百度坐标
      obj.arr = util.bdFromArr(arr);
    }
    // else if (scor == 3 && tcor == 4) { //900913到百度坐标
    //   obj.arr = util.transLonlatArr(arr, 3, 2).arr;
    //   obj.arr = util.transLonlatArr(obj.arr, 2, 4).arr;
    // } 
    else if (scor === 3 && tcor === 1) { //百度坐标到标准坐标
      obj.arr = util.bdToArr(arr);
      obj.arr = util.transLonlatArr(obj.arr, 2, 1).arr;
    } else if (scor === 3 && tcor === 2) { //百度坐标到火星坐标
      obj.arr = util.bdToArr(arr);
    }
    // else if (scor == 4 && tcor == 3) { //百度坐标到900913
    //   obj.arr = util.bdToArr(arr);
    //   obj.arr = util.transLonlatArr(obj.arr, 2, 3).arr;
    // }
    return obj;
  },
  corToArr: function(arr, dev) { //标准坐标转为火星坐标
    var isDev = util.isDeviation;
    if (dev != undefined) isDev = dev;
    var returnArr = [];
    var length = arr.length;
    for (var i = 0; i < length; i = i + 2) {
      if (i + 2 > length) continue;
      var lon = parseFloat(arr[i]);
      var lat = parseFloat(arr[i + 1]);
      if (isDev) {
        var ll = util.gcj_encrypt(lat, lon);
        returnArr.push(parseFloat(ll.lon));
        returnArr.push(parseFloat(ll.lat));
      } else {
        returnArr.push(lon);
        returnArr.push(lat);
      }

    }
    return returnArr;
  },
  corFromArr: function(arr, dev) { //火星坐标转为标准坐标
    var isDev = util.isDeviation;
    if (dev != undefined) isDev = dev;
    var returnArr = [];
    var length = arr.length;
    for (var i = 0; i < length; i = i + 2) {
      if (isDev) {
        var ll = util.gcj_decrypt_exact(parseFloat(arr[i + 1]), parseFloat(arr[i]));
        returnArr.push(parseFloat(ll.lon));
        returnArr.push(parseFloat(ll.lat));
      } else {
        returnArr.push(parseFloat(arr[i]));
        returnArr.push(parseFloat(arr[i + 1]));
      }

    }
    return returnArr;
  },
  bdToArr: function(arr) { //百度转为火星坐标
    var returnArr = [];
    var length = arr.length;
    for (var i = 0; i < length; i = i + 2) {
      if (i + 2 > length) continue;
      var lon = parseFloat(arr[i]);
      var lat = parseFloat(arr[i + 1]);
      var ll = util.bd_decrypt(lat, lon);
      returnArr.push(parseFloat(ll.lon));
      returnArr.push(parseFloat(ll.lat));
    }
    return returnArr;
  },
  bdFromArr: function(arr, dev) { //火星坐标转为百度
    var returnArr = [];
    var length = arr.length;
    for (var i = 0; i < length; i = i + 2) {
      if (i + 2 > length) continue;
      var lon = parseFloat(arr[i]);
      var lat = parseFloat(arr[i + 1]);
      var ll = util.bd_encrypt(lat, lon);
      returnArr.push(parseFloat(ll.lon));
      returnArr.push(parseFloat(ll.lat));
    }
    return returnArr;
  },
  // transfrom9: function(lon, lat) { // 900913 to 4326
  //   if (lat == undefined) {
  //     if ((typeof lon) == "object") {
  //       return util.transfrom9Arr(lon);
  //     } else {
  //       return util.transfrom9Arr(lon.split(","));
  //     }
  //   } else {
  //     var tem_ll = ol.proj.transform([parseFloat(lon), parseFloat(lat)], util.projection900913, util.projection4326);
  //     //var tem_ll_ob = util.gcj_encrypt(parseFloat(tem_ll[1]), parseFloat(tem_ll[0])); 
  //     return [parseFloat(tem_ll[0]), parseFloat(tem_ll[1])];
  //   }
  // },
  // transfrom9Arr: function(arr) { // 900913 to 4326
  //   var coors = [];
  //   var length = arr.length;
  //   var tem_ll = null;
  //   if ((typeof arr[0]) == "object") {
  //     for (var i = 0; i < length; i++) {
  //       tem_ll = util.transfrom9(arr[i][0], arr[i][1]);
  //       coors.push(tem_ll);
  //     }
  //   } else {
  //     for (var i = 0; i < length; i = i + 2) {
  //       tem_ll = util.transfrom9(arr[i], arr[i + 1]);
  //       coors.push(parseFloat(tem_ll[0]));
  //       coors.push(parseFloat(tem_ll[1]));
  //     }
  //   }

  //   return coors;
  // },
  // transfrom9ArrForObject: function(arr) { // 900913 to 4326 [a,b,c,d]->[a,b,c,d] [[a,b],[c,d]]->[a,b,c,d]
  //   var list = util.transfrom9(arr);
  //   if ((typeof list[0]) == "object") {
  //     var coors = [];
  //     for (var i = 0, length = list.length; i < length; i++) {
  //       coors.push(list[i][0]);
  //       coors.push(list[i][1]);
  //     }
  //     return coors;
  //   } else {
  //     return list;
  //   }

  // },
  // transto9: function(lon, lat) { // 4326 to 900913
  //   if (lat == undefined) {
  //     if ((typeof lon) == "object") {
  //       return util.transto9Arr(lon);
  //     } else {
  //       return util.transto9Arr(lon.split(","));
  //     }
  //   } else {
  //     //var tem_ll_ob = util.gcj_decrypt_exact(parseFloat(lat), parseFloat(lon)); 
  //     var tem_ll = new ol.proj.transform([parseFloat(lon), parseFloat(lat)], util.projection4326, util.projection900913);
  //     return tem_ll;
  //   }
  // },
  // transto9Arr: function(arr) { //4326 to 900913
  //   var coors = [];
  //   var length = arr.length;
  //   var tem_ll = null;
  //   if ((typeof arr[0]) == "object") {
  //     for (var i = 0; i < length; i++) {
  //       tem_ll = util.transto9(arr[i][0], arr[i][1]);
  //       coors.push(tem_ll);
  //     }

  //   } else {
  //     for (var i = 0; i < length; i = i + 2) {
  //       tem_ll = util.transto9(arr[i], arr[i + 1]);
  //       coors.push(parseFloat(tem_ll[0]));
  //       coors.push(parseFloat(tem_ll[1]));
  //     }
  //   }
  //   return coors;
  // },
  // transto9ArrForObject: function(arr) { //4326 to 900913  [a,b,c,d]->[a,b,c,d] [a,b,c,d]->[[a,b],[c,d]]
  //   var coors = [];
  //   var tran = util.transto9(arr);
  //   if ((typeof arr[0]) == "object") {
  //     return arr;
  //   }
  //   for (var i = 0, length = tran.length; i < length; i = i + 2) {
  //     coors.push([tran[i], tran[i + 1]]);
  //   }
  //   return coors;

  // },
  /**
   * 获取点格式经纬度数组（一维数组）
   *
   * @param lonlats
   */
  // getPointCoordinateFromStr: function(lonlats) {
  //   var array = [];
  //   if (!lonlats || lonlats == "") {
  //     return array;
  //   }
  //   var tempAarry = null;
  //   if (typeof lonlats == "object") {
  //     tempAarry = lonlats;
  //   } else {
  //     tempAarry = lonlats.split(",");
  //   }

  //   if (tempAarry.length != 2) {
  //     ui.showMessage("点坐标数据[" + lonlats + "]有问题，请核查！");
  //   }
  //   for (var str in tempAarry) {
  //     array.push(parseFloat(tempAarry[str]));
  //   }
  //   return array;
  // },
  /**
   * 获取线格式经纬度数组（二维数组）
   *
   * @param lonlats
   */
  // getLineCoordinateFromStr: function(lonlats) {
  //   var array = [];
  //   if (!lonlats || lonlats == "") {
  //     return array;
  //   }
  //   var tempAarry = null;
  //   if (typeof lonlats == "object") {
  //     tempAarry = lonlats;
  //   } else {
  //     tempAarry = lonlats.split(",");
  //   }

  //   if (tempAarry.length % 2 != 0) {
  //     ui.showMessage("线坐标数据[" + lonlats + "]有问题，请核查！");
  //   }
  //   var length = tempAarry.length;
  //   for (var i = 0; i < length - 1;) {
  //     var array2 = [];
  //     array2.push(parseFloat(tempAarry[i]));
  //     array2.push(parseFloat(tempAarry[i + 1]));
  //     array.push(array2);
  //     i = i + 2;
  //   }
  //   return array;
  // },
  /**
   * 获取面格式经纬度数组（三维数组）
   *
   * @param lonlats
   */
  // getPolygonCoordinateFromStr: function(lonlats) {
  //   var array3 = [];
  //   if (!lonlats || lonlats == "") {
  //     return array3;
  //   }
  //   var array = [];
  //   var tempAarry = null;
  //   if (typeof lonlats == "object") {
  //     tempAarry = lonlats;
  //   } else {
  //     tempAarry = lonlats.split(",");
  //   }
  //   if (tempAarry.length % 2 != 0) {
  //     ui.showMessage("面坐标数据[" + lonlats + "]有问题，请核查！");
  //   }
  //   var length = tempAarry.length;
  //   for (var i = 0; i < length - 1;) {
  //     var array2 = [];
  //     array2.push(parseFloat(tempAarry[i]));
  //     array2.push(parseFloat(tempAarry[i + 1]));
  //     array.push(array2);
  //     i = i + 2;
  //   }
  //   array3.push(array);
  //   return array3;
  // },
  // getPolygonStrFromArcgisPolygonStr: function(lonlats) {
  //   //lonlats = "POLYGON (( 110.06544906 34.52209921, 110.06544906 34.50209921, 110.07301249 34.50209921, 110.07301249 34.52209921, 110.06544906 34.52209921))";
  //   lonlats = lonlats.replace(new RegExp("POLYGON", "g"), "").replace(new RegExp("\\(", "g"), "").replace(new RegExp("\\)", "g"), "");
  //   var tmpLonlats = lonlats.split(",");
  //   var points = [];
  //   var cors = [];
  //   for (var i = 0; i < tmpLonlats.length; i++) {
  //     points = tmpLonlats[i].split(" ");
  //     for (var j = 0; j < points.length; j++) {
  //       if (points[j] != "") {
  //         cors.push(points[j]);
  //       }
  //     }
  //   }
  //   return cors.join(",");
  // },
  // colorRgbToHex: function(colorRgb) {
  //   var that = colorRgb;
  //   //十六进制颜色值的正则表达式
  //   var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  //   // 如果是rgb颜色表示
  //   if (/^(rgb|RGB)/.test(that)) {
  //     var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
  //     var strHex = "#";
  //     for (var i = 0; i < aColor.length; i++) {
  //       var hex = Number(aColor[i]).toString(16);
  //       if (hex === "0") {
  //         hex += hex;
  //       }
  //       strHex += hex;
  //     }
  //     if (strHex.length !== 7) {
  //       strHex = that;
  //     }
  //     return strHex;
  //   } else if (reg.test(that)) {
  //     var aNum = that.replace(/#/, "").split("");
  //     if (aNum.length === 6) {
  //       return that;
  //     } else if (aNum.length === 3) {
  //       var numHex = "#";
  //       for (var i = 0; i < aNum.length; i += 1) {
  //         numHex += (aNum[i] + aNum[i]);
  //       }
  //       return numHex;
  //     }
  //   }
  //   return that;
  // },
  // colorHexToRgb: function(colorHex) {
  //   var sColor = colorHex.toLowerCase();
  //   //十六进制颜色值的正则表达式
  //   var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  //   // 如果是16进制颜色
  //   if (sColor && reg.test(sColor)) {
  //     if (sColor.length === 4) {
  //       var sColorNew = "#";
  //       for (var i = 1; i < 4; i += 1) {
  //         sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
  //       }
  //       sColor = sColorNew;
  //     }
  //     //处理六位的颜色值
  //     var sColorChange = [];
  //     for (var i = 1; i < 7; i += 2) {
  //       sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
  //     }
  //     return "RGB(" + sColorChange.join(",") + ")";
  //   }
  //   return sColor;
  // },
  // colorHexToRgba: function(colorHex, opacity) {
  //   var rgb = util.colorHexToRgb(colorHex);
  //   return rgb.replace(/RGB/, "RGBA").replace(")", "," + opacity + ")");
  // },
  /**
   * 获取线的中间点
   * @param lonlats
   * @returns {Array}
   */
  // getLineMidCoordinate: function(coordinates) {
  //   var coordinate = null;
  //   if (coordinates && coordinates.length >= 2) {
  //     var index = parseInt(coordinates.length / 2);
  //     coordinate = coordinates[index];
  //   }
  //   return coordinate;
  // },
  delta: function(lat, lon) {
    // Krasovsky 1940
    // a = 6378245.0, 1/f = 298.3
    // b = a * (1 - f)
    // ee = (a^2 - b^2) / a^2;
    var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
    var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
    var dLat = this.transformLat(lon - 105.0, lat - 35.0);
    var dLon = this.transformLon(lon - 105.0, lat - 35.0);
    var radLat = lat / 180.0 * this.PI;
    var magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
    return {
      'lat': dLat,
      'lon': dLon
    };
  },

  //WGS-84 to GCJ-02
  gcj_encrypt: function(wgsLat, wgsLon) {
    if (this.outOfChina(wgsLat, wgsLon))
      return {
        'lat': wgsLat,
        'lon': wgsLon
      };

    var d = this.delta(wgsLat, wgsLon);
    return {
      'lat': wgsLat + d.lat,
      'lon': wgsLon + d.lon
    };
  },
  // //GCJ-02 to WGS-84
  gcj_decrypt: function(gcjLat, gcjLon) {
    if (this.outOfChina(gcjLat, gcjLon))
      return {
        'lat': gcjLat,
        'lon': gcjLon
      };

    var d = this.delta(gcjLat, gcjLon);
    return {
      'lat': gcjLat - d.lat,
      'lon': gcjLon - d.lon
    };
  },
  // //GCJ-02 to WGS-84 exactly
  gcj_decrypt_exact: function(gcjLat, gcjLon) {
    var initDelta = 0.01;
    var threshold = 0.000000001;
    var dLat = initDelta,
      dLon = initDelta;
    var mLat = gcjLat - dLat,
      mLon = gcjLon - dLon;
    var pLat = gcjLat + dLat,
      pLon = gcjLon + dLon;
    var wgsLat, wgsLon, i = 0;
    while (1) {
      wgsLat = (mLat + pLat) / 2;
      wgsLon = (mLon + pLon) / 2;
      var tmp = this.gcj_encrypt(wgsLat, wgsLon)
      dLat = tmp.lat - gcjLat;
      dLon = tmp.lon - gcjLon;
      if ((Math.abs(dLat) < threshold) && (Math.abs(dLon) < threshold))
        break;

      if (dLat > 0) pLat = wgsLat;
      else mLat = wgsLat;
      if (dLon > 0) pLon = wgsLon;
      else mLon = wgsLon;

      if (++i > 10000) break;
    }
    //console.log(i);
    return {
      'lat': wgsLat,
      'lon': wgsLon
    };
  },
  //GCJ-02 to BD-09
  bd_encrypt: function(gcjLat, gcjLon) {
    var x = gcjLon,
      y = gcjLat,
      bdLon,
      bdLat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
    bdLon = z * Math.cos(theta) + 0.0065;
    bdLat = z * Math.sin(theta) + 0.006;
    return {
      'lat': bdLat,
      'lon': bdLon
    };
  },
  // //BD-09 to GCJ-02
  bd_decrypt: function(bdLat, bdLon) {
    var x = bdLon - 0.0065,
      y = bdLat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
    var gcjLon = z * Math.cos(theta);
    var gcjLat = z * Math.sin(theta);
    return {
      'lat': gcjLat,
      'lon': gcjLon
    };
  },
  // //WGS-84 to Web mercator
  // //mercatorLat -> y mercatorLon -> x
  // mercator_encrypt: function(wgsLat, wgsLon) {
  //   var x = wgsLon * 20037508.34 / 180.;
  //   var y = Math.log(Math.tan((90. + wgsLat) * this.PI / 360.)) / (this.PI / 180.);
  //   y = y * 20037508.34 / 180.;
  //   return {
  //     'lat': y,
  //     'lon': x
  //   };
  //   /*
  //    if ((Math.abs(wgsLon) > 180 || Math.abs(wgsLat) > 90))
  //    return null;
  //    var x = 6378137.0 * wgsLon * 0.017453292519943295;
  //    var a = wgsLat * 0.017453292519943295;
  //    var y = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
  //    return {'lat' : y, 'lon' : x};
  //    //*/
  // },
  // Web mercator to WGS-84
  // mercatorLat -> y mercatorLon -> x
  // mercator_decrypt: function(mercatorLat, mercatorLon) {
  //   var x = mercatorLon / 20037508.34 * 180.;
  //   var y = mercatorLat / 20037508.34 * 180.;
  //   y = 180 / this.PI * (2 * Math.atan(Math.exp(y * this.PI / 180.)) - this.PI / 2);
  //   return {
  //     'lat': y,
  //     'lon': x
  //   };
  //   /*
  //    if (Math.abs(mercatorLon) < 180 && Math.abs(mercatorLat) < 90)
  //    return null;
  //    if ((Math.abs(mercatorLon) > 20037508.3427892) || (Math.abs(mercatorLat) > 20037508.3427892))
  //    return null;
  //    var a = mercatorLon / 6378137.0 * 57.295779513082323;
  //    var x = a - (Math.floor(((a + 180.0) / 360.0)) * 360.0);
  //    var y = (1.5707963267948966 - (2.0 * Math.atan(Math.exp((-1.0 * mercatorLat) / 6378137.0)))) * 57.295779513082323;
  //    return {'lat' : y, 'lon' : x};
  //    //*/
  // },
  // two point's distance
  // distance: function(latA, lonA, latB, lonB) {
  //   var earthR = 6378137.;
  //   var x = Math.cos(latA * this.PI / 180.) * Math.cos(latB * this.PI / 180.) * Math.cos((lonA - lonB) * this.PI / 180);
  //   var y = Math.sin(latA * this.PI / 180.) * Math.sin(latB * this.PI / 180.);
  //   var s = x + y;
  //   if (s > 1) s = 1;
  //   if (s < -1) s = -1;
  //   var alpha = Math.acos(s);
  //   var distance = alpha * earthR;
  //   return distance;
  // },
  outOfChina: function(lat, lon) {
    if (lon < 72.004 || lon > 137.8347)
      return true;
    if (lat < 0.8293 || lat > 55.8271)
      return true;
    return false;
  },
  transformLat: function(x, y) {
    var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
    return ret;
  },
  transformLon: function(x, y) {
    var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
    return ret;
  },
  //根据初始的经纬点、半径、需要获取的个数，返回一个数据集
  // getLonLatsByOrigionAndNum: function(origionLonlat, count, radius) {
  //   var mod = count % 2;
  //   var endIndex = parseInt(count / 2);
  //   var startIndex = endIndex * (-1);
  //   var radiusArr = [];
  //   for (var i = startIndex; i <= endIndex; i++) {
  //     if (mod == 1) {
  //       radiusArr.push(i * radius);
  //     } else {
  //       if (i < 0) {
  //         radiusArr.push((i + 0.5) * radius);
  //       } else if (i == 0) { //偶数个数跳过中间点0
  //         //radiusArr.push(0);
  //       } else {
  //         radiusArr.push((i - 0.5) * radius);
  //       }
  //     }
  //   }
  //   var wgs84Sphere = new ol.Sphere(6378137);
  //   var resultArr = [];
  //   for (var i = 0; i < radiusArr.length; i++) {
  //     var data1 = wgs84Sphere.offset(origionLonlat, radiusArr[i], 0);
  //     resultArr.push(data1);
  //   }
  //   return resultArr;
  // },
  /**
     * var points = [];
		points.push({lon:127.3,lat:23.4});
		points.push({lon:126.5,lat:22.6});
		points.push({lon:123.3,lat:26.3});
		points.push({lon:120.4,lat:24.3});
     */
  // getCenterLonlatFromPoints: function(points) {
  //   var lonlat = null;
  //   var maxLon = -180;
  //   var maxLat = -90;
  //   var minLon = 180;
  //   var minLat = 90;
  //   for (var i = 0; i < points.length; i++) {
  //     if (points[i].lon > maxLon) {
  //       maxLon = points[i].lon;
  //     }
  //     if (points[i].lon < minLon) {
  //       minLon = points[i].lon;
  //     }
  //     if (points[i].lat > maxLat) {
  //       maxLat = points[i].lat;
  //     }
  //     if (points[i].lat < minLat) {
  //       minLat = points[i].lat;
  //     }
  //   }
  //   if (points.length > 0) {
  //     lonlat = {
  //       lon: (maxLon + minLon) / 2.0,
  //       lat: (maxLat + minLat) / 2.0
  //     }
  //   }
  //   return lonlat;
  // },
  // trim: function(str) {
  //   if (str == undefined) return "";
  //   str = str.replace(/^\s\s*/, '');
  //   var ws = /\s/;
  //   i = str.length;
  //   while (ws.test(str.charAt(--i)));
  //   return str.slice(0, i + 1);
  // },
  // transform: function(coordinate, source, destination) {
  //   return ol.proj.transform(coordinate, source, destination);
  // },
  // isInArrByValue: function(arr, value) {
  //   var flag = false;
  //   for (var i = 0, length = arr.length; i < length; i++) {
  //     if (arr[i] == value) {
  //       flag = true;
  //       break;
  //     }
  //   }
  //   return flag;
  // },
  // getJstsReader: function() {
  //   if (util.jstsReader == undefined) {
  //     util.jstsReader = new jsts.io.WKTReader();
  //   }
  //   return util.jstsReader;
  // },
  // getWktData: function(lonlats) {
  //   var arr = lonlats;
  //   if ((typeof lonlats) == "string")
  //     arr = lonlats.split(",");
  //   var dataArr = [];
  //   for (var i = 0, length = arr.length; i < length; i = i + 2) {
  //     dataArr.push(arr[i] + " " + arr[i + 1]);
  //   }
  //   return dataArr.join(",");
  // },
  // getPolygonWkt: function(lonlats) {
  //   return "POLYGON((" + util.getWktData(lonlats) + "))";
  // },
  // getLineStringWkt: function(lonlats) {
  //   return "LINESTRING(" + util.getWktData(lonlats) + ")";
  // },
  // getPointWkt: function(lonlats) {
  //   return "POINT(" + util.getWktData(lonlats) + ")";
  // },
  // getGeo: function(lonlats, isFace) {
  //   var arr = lonlats;
  //   if ((typeof lonlats) == "string")
  //     arr = lonlats.split(",");
  //   if (arr.length == 2) {
  //     return util.getJstsReader().read(util.getPointWkt(arr));
  //   } else if (isFace == undefined || !isFace) {
  //     return util.getJstsReader().read(util.getLineStringWkt(arr));
  //   } else {
  //     return util.getJstsReader().read(util.getPolygonWkt(arr));
  //   }
  // },
  //    getGeo: function(lonlats, isFace){
  //    	var arr = lonlats;
  //    	if((typeof lonlats) == "string")
  //    		arr = lonlats.split(",");
  //    	if(arr.length == 2){          
  //    		return util.getJstsReader().read(util.getPointWkt(arr));
  //    	}else if(isFace == undefined || !isFace){
  //    		return util.getJstsReader().read(util.getLineStringWkt(arr));
  //    	}else{
  //    		return util.getJstsReader().read(util.getPolygonWkt(arr));
  //    	}
  //    },
  // getDistance: function(str) {
  //   var strArr = str.split(",");
  //   var distance = 0;
  //   for (var i = 2, length = strArr.length; i < length; i = i + 2) {
  //     var p1 = util.geometryFactory.createPoint(new jsts.geom.Coordinate(parseFloat(strArr[i - 2]), parseFloat(strArr[i - 1])));
  //     var p2 = util.geometryFactory.createPoint(new jsts.geom.Coordinate(parseFloat(strArr[i]), parseFloat(strArr[i + 1])));
  //     distance = p1.distance(p2);
  //   }
  //   return distance;
  // },
  // removeSamePoint: function(inpuOkLonlats, inpuNum) {
  //   var num = (inpuNum == undefined ? 1 : inpuNum);
  //   var okLonlats = inpuOkLonlats;
  //   if (typeof inpuOkLonlats == "string") {
  //     okLonlats = inpuOkLonlats.split(",");
  //   }
  //   var lonlats = [];
  //   lonlats.push(okLonlats[0]);
  //   lonlats.push(okLonlats[1]);
  //   for (var i = 2, length = okLonlats.length; i < length; i = i + 2) {
  //     if (!(okLonlats[i] == okLonlats[i - 2] && okLonlats[i + 1] == okLonlats[i - 1])) {
  //       lonlats.push(okLonlats[i]);
  //       lonlats.push(okLonlats[i + 1]);
  //     }
  //   }
  //   if (num > 1) {
  //     var tempLonlats = lonlats;
  //     lonlats = [];
  //     var step = 2 * num;
  //     var nextStep = step + 1;
  //     for (var i = 0, length = tempLonlats.length; i < length; i = i + 2) {
  //       if ((i + nextStep) < length) {
  //         if (!(tempLonlats[i] == tempLonlats[i + step] && tempLonlats[i + 1] == tempLonlats[i + nextStep])) {
  //           lonlats.push(okLonlats[i]);
  //           lonlats.push(okLonlats[i + 1]);
  //         } else if ((tempLonlats[i] == tempLonlats[i + 4] && tempLonlats[i + 1] == tempLonlats[i + nextStep])) {
  //           lonlats.push(okLonlats[i]);
  //           lonlats.push(okLonlats[i + 1]);
  //           var isCont = true;
  //           var count = 1;
  //           while (isCont) {
  //             var temIndex = i + count * step + 1;
  //             if (temIndex < length) {
  //               if (tempLonlats[i] == tempLonlats[temIndex - 1] && tempLonlats[i + 1] == tempLonlats[temIndex]) {
  //                 count++;
  //               } else {
  //                 isCont = false;
  //               }
  //             } else {
  //               isCont = false;
  //             }
  //           }
  //           i = temIndex - nextStep;
  //         }
  //       } else {
  //         lonlats.push(okLonlats[i]);
  //         lonlats.push(okLonlats[i + 1]);
  //       }
  //     }
  //   }
  //   return lonlats;
  // },
  // getLineGeosByLonlats: function(lonlats, isRemoveBeforePoint) {
  //   var isRemove = false;
  //   if (isRemoveBeforePoint != undefined) isRemove = isRemoveBeforePoint;
  //   var lineArr = [];
  //   var arr = lonlats.split(",");
  //   if (isRemove) arr = util.removeSamePoint(arr);
  //   for (var i = 0, length = arr.length; i < length; i = i + 2) {
  //     if ((i + 3) < length) {
  //       lineArr.push(util.getGeo(arr[i] + "," + arr[i + 1] + "," + arr[i + 2] + "," + arr[i + 3]));
  //     }
  //   }
  //   return lineArr;
  // },
  // isPolygonInterChiasma: function(lonlats) {
  //   var lineArr = util.getLineGeosByLonlats(lonlats, true);
  //   //arr = util.getWktData(arr).split(",");
  //   //var isChiasma = false;
  //   var infoLev = 1;
  //   for (var i = 0, length = lineArr.length; i < length; i++) {
  //     var clength = length;
  //     if (i == 0) clength = clength - 1;
  //     if (i + 2 < length) {
  //       //var line1 = util.getGeo(lineArr[i]);
  //       for (var j = i + 2; j < clength; j++) {
  //         var distance = lineArr[i].distance(lineArr[j]);
  //         //if(distance < util.jstsDistance){
  //         if (distance == 0) {
  //           var lonlat1 = util.getLonlatByGeom(lineArr[i]);
  //           var lonlat2 = util.getLonlatByGeom(lineArr[j]);
  //           if (util.isHaveSamePoint(lonlat1, lonlat2)) {
  //             infoLev = 3;
  //           } else {
  //             infoLev = 2;
  //             break;
  //           }
  //           //isChiasma = true;
  //           //console.log("begin");
  //           //console.log(util.getLonlatByGeom(lineArr[i]));
  //           //console.log(util.getLonlatByGeom(lineArr[j]));
  //           //console.log("end");
  //           //break;
  //         }
  //       }
  //     }
  //     if (infoLev == 2) break;
  //   }
  //   //return isChiasma;
  //   return infoLev;
  // },
  // getLonlatByGeom: function(geo) {
  //   var cors = geo.getCoordinates();
  //   var lonlats = [];
  //   for (var i = 0, length = cors.length; i < length; i++) {
  //     lonlats.push(cors[i].x);
  //     lonlats.push(cors[i].y);
  //   }
  //   return lonlats.join(",");
  // },
  // isHaveSamePoint: function(lonlat1, lonlat2) {
  //   var isSame = false;
  //   var arr1 = lonlat1.split(",");
  //   var arr2 = lonlat2.split(",");
  //   for (var i = 0, length = arr1.length; i < length; i = i + 2) {
  //     for (var j = 0, jlength = arr2.length; j < length; j = j + 2) {
  //       if (arr1[i] == arr2[j] && arr1[i + 1] == arr2[j + 1]) {
  //         isSame = true;
  //         break;
  //       }
  //     }
  //   }
  //   return isSame;
  // },
  // removeSamePoint2: function(slonlats, num) {
  //   okLonlats = slonlats.split(",");
  //   num = (num == undefined ? 1 : num);
  //   var lonlats = [];
  //   lonlats.push(okLonlats[0]);
  //   lonlats.push(okLonlats[1]);
  //   for (var i = 2, length = okLonlats.length; i < length; i = i + 2) {
  //     if (!(okLonlats[i] == okLonlats[i - 2] && okLonlats[i + 1] == okLonlats[i - 1])) {
  //       lonlats.push(okLonlats[i]);
  //       lonlats.push(okLonlats[i + 1]);
  //     }
  //   }
  //   if (num > 1) {
  //     var tempLonlats = lonlats;
  //     lonlats = [];
  //     for (var i = 0, length = tempLonlats.length; i < length; i = i + 2) {
  //       if (i + 5 < length) {
  //         if (!(tempLonlats[i] == tempLonlats[i + 4] && tempLonlats[i + 1] == tempLonlats[i + 5])) {
  //           lonlats.push(okLonlats[i]);
  //           lonlats.push(okLonlats[i + 1]);
  //         } else if ((tempLonlats[i] == tempLonlats[i + 4] && tempLonlats[i + 1] == tempLonlats[i + 5])) {
  //           lonlats.push(okLonlats[i]);
  //           lonlats.push(okLonlats[i + 1]);
  //           var isCont = true;
  //           var count = 1;
  //           while (isCont) {
  //             var temIndex = i + count * 4 + 1;
  //             if (temIndex < length) {
  //               if (tempLonlats[i] == tempLonlats[temIndex - 1] && tempLonlats[i + 1] == tempLonlats[temIndex]) {
  //                 count++;
  //               } else {
  //                 isCont = false;
  //               }
  //             } else {
  //               isCont = false;
  //             }

  //           }

  //           i = temIndex - 1;
  //         }
  //       } else {
  //         lonlats.push(okLonlats[i]);
  //         lonlats.push(okLonlats[i + 1]);
  //       }
  //     }
  //   }

  //   return lonlats;
  // },
  // getProByFeature: function(feature) {
  //   var fea_attr = feature.getProperties();
  //   var pro = {};
  //   for (var temKey in fea_attr) {
  //     if (temKey != "geometry" && temKey != "GEOMETRY") {
  //       pro[temKey] = fea_attr[temKey];
  //     }
  //   }
  //   if (fea_attr.GIS_ID) {
  //     var gisId = fea_attr.GIS_ID.split(".");
  //     if (gisId.length == 3) {
  //       pro.TABLENAME = gisId[1];
  //       pro.ID = gisId[2];
  //     }
  //   }
  //   return pro;
  // },
  // getLonlatByExtent: function(extent) {
  //   // minX,minY,maxX,maxY
  //   if ((typeof extent) == "string") {
  //     extent = extent.split(",");
  //   }
  //   var lonlats = [];
  //   lonlats.push([extent[0], extent[1]]);
  //   lonlats.push([extent[0], extent[3]]);
  //   lonlats.push([extent[2], extent[3]]);
  //   lonlats.push([extent[2], extent[1]]);
  //   lonlats.push([extent[0], extent[1]]);
  //   return lonlats.join(",");
  // },
  // getLonlatsByGeom: function(intersection) {
  //   var cors = intersection.getCoordinates();
  //   var lonlats = [];
  //   for (var i = 0, length = cors.length; i < length; i++) {
  //     lonlats.push([cors[i].x, cors[i].y]);
  //   }
  //   return lonlats.join(",");
  // },
  // getIntersectLonlatByFl: function(flonlat, lineLonlat) {
  //   var fgeo = util.getGeo(flonlat, true);
  //   var lgeo = util.getGeo(lineLonlat);
  //   var intersection = fgeo.intersection(lgeo);
  //   var lonlats = util.getLonlatsByGeom(intersection);
  //   //console.log(lgeo);
  //   //console.log(intersection);
  //   /*console.log(intersection);
  //       if(intersection instanceof jsts.geom.LineString){
  //       	lonlats = util.getLonlatsByGeom(intersection);
  //       }else if(intersection instanceof jsts.geom.MultiLineString){
  //       	console.log(intersection.getCoordinates());
  //       }else if(intersection instanceof jsts.geom.GeometryCollection){

  //       }*/
  //   return lonlats;
  // },
  // excuByCondition: function(condition, excuFun, paras) {
  //   util.excuByConditionDetail(condition, excuFun, paras, 0, 0.3);
  // },
  // excuByConditionDetail: function(condition, excuFun, paras, count, delayTime, maxCount) {
  //   if (maxCount == undefined) maxCount = 20;
  //   setTimeout(function() {
  //     if (condition() || count > maxCount) {
  //       excuFun(paras);
  //     } else {
  //       count++;
  //       util.excuByConditionDetail(condition, excuFun, paras, count, delayTime, maxCount);
  //     }
  //   }, delayTime * 1000);
  // },
  // arrAddArr: function(a, b) {
  //   for (var i = 0; i < b.length; i++) {
  //     a.push(b[i])
  //   }
  // }



}
