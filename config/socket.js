let students = []

export default io => io.on('connection', socket => {
    socket.on('push-data', data => {
        students.push({...data, sid: socket.id, ip: socket.handshake.address})
        io.emit('send-admin', students)
    })

    socket.on('req-data', () => {
        io.emit('send-admin', students)
    })

    socket.on('finish-test', () => {
        students = students.filter(s => s.sid !== socket.id)
        io.emit('send-admin', students)
    })

    socket.on('disconnect', () => {
        students = students.filter(s => s.sid !== socket.id)
        io.emit('send-admin', students)
    })
})