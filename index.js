module.exports = function bullBoard(sails) {
    return {
        configure: function () {
            if (sails.config[this.configKey]) {

            } else {
                sails.config[this.configKey] = {
                    host: '127.0.0.1',
                    port: 6379
                }
            }

        },
        initialize: async function () {
            const Queue = require('bull')
            const { setQueues, UI } = require('bull-board')
            
            sails.registerActionMiddleware(UI, '*')

            this.refundQueue = new Queue('Moka Refund Requests', { redis: sails.config[this.configKey].redis })
            setQueues(this.refundQueue)
        },

        getRefundQueue: function () {
            return this.refundQueue
        }

    }
}