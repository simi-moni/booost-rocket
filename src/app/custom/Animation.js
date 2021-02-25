import config from '../../config';
import { gsap, MotionPathPlugin } from 'gsap/all';

export default class Animation {
    constructor() {
        this._rocketElement = document.querySelector('.rocket');
        this._backgroundElement = document.querySelector('.background');
        this._svgPath = config.svgPath;
        this._rocketTween = null;
    }

    start() {
        gsap.registerPlugin(MotionPathPlugin);
        this._rocketTween = gsap.to(this._rocketElement, {
            repeat: -1, duration: 5,
            motionPath: { path: this._svgPath, autoRotate: true }
        });

        const self = this;
        let isClicked = false;
        this._backgroundElement.addEventListener('click',
            function () {
                if (isClicked) {
                    self._rocketTween = gsap.to(self._rocketElement,
                        { repeat: -1, duration: 5, motionPath: { path: self._svgPath, autoRotate: true } });
                    isClicked = false;
                }
                else {
                    self._rocketTween.kill();
                    self._rocketTween = null;
                    isClicked = true;
                }
            });
    }
}
