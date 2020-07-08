import Vue from 'vue'
import Router from 'vue-router'
import CoordTransform from 'components/coordinate/CoordinateTransform/CoordinateTransform'
import SeverCenter from 'components/sever-center/SeverCenter'
import SeverCenterShowMap from 'components/sever-center/SeverCenterShowMap/SeverCenterShowMap'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [{
    path: '/coordTransform',
    name: 'coordTransform',
    component: CoordTransform
  }, {
    path: '/severCenter',
    name: 'severCenter',
    component: SeverCenter,
    children: [{
      path: 'mapshow',
      name: 'mapshow',
      component: SeverCenterShowMap
    }]
  }]
})
