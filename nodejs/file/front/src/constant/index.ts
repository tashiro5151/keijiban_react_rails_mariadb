export const constant = {
  THIS_URL: {
    development: 'http://192.168.0.4:1234',
    production: `http://${process.env.SERVER_IP}:${process.env.NGINX_PORT}`
  },

  REQUEST_URL: {
    development: 'http://192.168.0.4:3000/api/v1',
    production: `http://${process.env.SERVER_IP}:${process.env.BACKEND_PORT}/api/v1`
  },

  HEADER: {
    Authorization: 'Bearer abc',
    'Content-Type': 'application/json'
  },

  GENRE: {
    0: '音楽・芸能',
    1: 'ゲーム',
    2: 'ネットゲーム',
    3: 'コンピュータ',
    4: 'インターネット',
    5: 'スポーツ',
    6: '同人',
    7: '旅行',
    8: '学校',
    9: '映画',
    10: 'アニメ',
    11: 'マンガ',
    12: 'ビジネス',
    13: '自動車',
    14: '学問',
    15: 'ニュース',
    16: 'ショッピング',
    17: 'ラジオ'
  }
};
