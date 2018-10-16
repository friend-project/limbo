const domain = {}
// domain.web = 'https://error-free.jd.com'
// domain.static = 'https://error-free.jd.com'

if (process.env.NODE_ENV === 'development') {
  domain.web = 'http://10.13.75.23:8889'
  domain.static = 'http://10.13.75.23:8889'
} else {
  domain.web = 'https://error-free.jd.com'
  domain.static = 'https://error-free.jd.com'
}

export default domain

