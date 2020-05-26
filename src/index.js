import './style.css';

import Granim from 'granim';

var granimInstance = new Granim({
    element: '#canvas-complex',
    direction: 'left-right',
    isPausedWhenNotInView: true,
    states : {
        "default-state": {
            gradients: [
                [
                    { color: '#b803d1', pos: .2 },
                    { color: '#f1420b', pos: .8 },
                    { color: '#f1f10b', pos: 1 }
                ], [
                    { color: '#f1f10b', pos: 0 },
                    { color: '#ec0949', pos: .2 },
                    { color: '#ec0949', pos: .75 }
                ],
            ]
        }
    }
});