const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
const port = process.env.PORT || 5000
app.use('/media', express.static(path.join(__dirname, '/media')))

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})

app.get('/api/filters', (req, res) => {
	const data = require('./data/filters.json')
	res.send(JSON.stringify(data))
})

app.get('/api/products', (req, res) => {
	const imageBaseURL = `${req.protocol}://${req.get('host')}`
	const productsData = require('./data/products.json')
	const list = productsData?.items?.map(({ image, ...rest }) => ({
		...rest,
		image: image ? `${imageBaseURL}${image}` : null,
	}))

	res.json(list)
})
