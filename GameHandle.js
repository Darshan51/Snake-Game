export default class GameHandle {
    start(main) {
        window.requestAnimationFrame(main)
    }

    stop() {
        window.cancelAnimationFrame()
    }
}