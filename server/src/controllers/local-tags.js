const LocalTagsService = require('../services/local-tags')

const getAllTags = async (req, res) => {
    try {
        const tags = await LocalTagsService.getAllLocalTags()

        if(!tags.length) {
            return res.status(400).send({ error: 'no tags found'})
        }

        return res.status(200).send({ tags })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

module.exports = {
    getAllTags
}