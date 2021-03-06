module.exports = {
  register: async function(address) {
    app.sdb.lock('domain.register@' + address)
    let exists = await app.model.Domain.exists({address: address})
    if (exists) return 'Address already registered'
    console.log("register module callse")
    app.sdb.create('Domain', {
      address: address,
      owner: this.trs.senderId,
      suffix: address.split('.').pop()
    })
    app.logger.debug('doimain creeer')
  },
  set_ip: async function(address, ip) {
    app.sdb.lock('domain.register@' + address)
    let exists = await app.model.Domain.exists({address: address})
    if (!exists) return 'Address not exists' 
    app.sdb.update('Domain', { ip: ip }, { address: address })
  }
}   



