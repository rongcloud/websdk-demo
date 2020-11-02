function getUserInfo(id) {
  let userList = {
    '11': {
      portrait: 'http://rongcloud-image.ronghub.com/004d0444c2a1b9fdaa.png?e=1619758376&token=livk5rb3__JZjCtEiMxXpQ8QscLxbNLehwhHySnX:l2iPse-iWrQj5tT-t5mUUUm510c=',
      name: 'test_11',
      id: id
    }, '22': {
      portrait: 'http://rongcloud-image.ronghub.com/dd61f5411896b925d2.png?e=1619758397&token=livk5rb3__JZjCtEiMxXpQ8QscLxbNLehwhHySnX:EHGy80kzSdt7NqrHctC4KDYtxP8=',
      name: 'test_22',
      id: id
    }
  }
  return userList[id];
}

const appInfo = {
  "appKey": "8w7jv4qb82uyy",
  "22": "cC+jhy4U9zbk1xmbzBlI1WoDLREzxk5A@yhxs.cn.rongnav.com;yhxs.cn.rongcfg.com",
  "11": "2t6FYf/24Vzk1xmbzBlI1UHrf1LxVs40@yhxs.cn.rongnav.com;yhxs.cn.rongcfg.com"
};
