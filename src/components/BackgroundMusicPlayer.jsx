import React, { PropTypes } from 'react';
import { Song, Sequencer, Synth } from 'react-music';

const BackgroundMusicPlayer = ({ playing = false }) => (
   <Song playing={playing} tempo={140}>
      <Sequencer resolution={16} bars={8}>
         <Synth
            type="square"
            steps={[
               [0, 4, 'e5'],
               [4, 2, 'b4'],
               [6, 2, 'c5'],
               [8, 4, 'd5'],
               [12, 2, 'c5'],
               [14, 2, 'b4'],

               [16, 4, 'a4'],
               [20, 2, 'a4'],
               [22, 2, 'c5'],
               [24, 4, 'e5'],
               [28, 2, 'd5'],
               [30, 2, 'c5'],

               [32, 6, 'b4'],
               [38, 2, 'c5'],
               [40, 4, 'd5'],
               [44, 4, 'e5'],

               [48, 4, 'c5'],
               [52, 4, 'a4'],
               [56, 4, 'a4'],

               [66, 4, 'd5'],
               [70, 2, 'f5'],
               [72, 4, 'a5'],
               [76, 2, 'g5'],
               [78, 2, 'f5'],
               [80, 6, 'e5'],

               [86, 2, 'c5'],
               [88, 4, 'e5'],
               [92, 2, 'd5'],
               [94, 2, 'c5'],
               [96, 4, 'b4'],

               [100, 2, 'b4'],
               [102, 2, 'c5'],
               [104, 4, 'd5'],
               [108, 4, 'e5'],
               [112, 4, 'c5'],

               [116, 4, 'a4'],
               [120, 4, 'a4'],
            ]}
         />
      </Sequencer>
      <Sequencer resolution={8} bars={8}>
         <Synth
            type="triangle"
            steps={[
               [0, 1, 'e2'],
               [1, 1, 'e3'],
               [2, 1, 'e2'],
               [3, 1, 'e3'],
               [4, 1, 'e2'],
               [5, 1, 'e3'],
               [6, 1, 'e2'],
               [7, 1, 'e3'],

               [8, 1, 'a2'],
               [9, 1, 'a3'],
               [10, 1, 'a2'],
               [11, 1, 'a3'],
               [12, 1, 'a2'],
               [13, 1, 'a3'],
               [14, 1, 'a2'],
               [15, 1, 'a3'],

               [16, 1, 'g#2'],
               [17, 1, 'g#3'],
               [18, 1, 'g#2'],
               [19, 1, 'g#3'],
               [20, 1, 'e2'],
               [21, 1, 'e3'],
               [22, 1, 'e2'],
               [23, 1, 'e3'],

               [24, 1, 'a2'],
               [25, 1, 'a3'],
               [26, 1, 'a2'],
               [27, 1, 'a3'],
               [28, 1, 'a2'],
               [29, 1, 'a3'],
               [30, 1, 'b2'],
               [31, 1, 'c3'],

               [32, 1, 'd3'],
               [33, 1, 'd4'],
               [34, 1, 'd3'],
               [35, 1, 'd4'],
               [36, 1, 'd3'],
               [37, 1, 'd4'],
               [38, 1, 'd3'],
               [39, 1, 'd4'],

               [40, 1, 'c3'],
               [41, 1, 'c4'],
               [42, 1, 'c3'],
               [43, 1, 'c4'],
               [44, 1, 'c3'],
               [45, 1, 'c4'],
               [46, 1, 'c3'],
               [47, 1, 'c4'],

               [48, 1, 'b2'],
               [49, 1, 'b3'],
               [50, 1, 'b2'],
               [51, 1, 'b3'],
               [52, 1, 'g#2'],
               [53, 1, 'g#3'],
               [54, 1, 'g#2'],
               [55, 1, 'g#3'],

               [56, 1, 'a2'],
               [57, 1, 'a3'],
               [58, 1, 'a2'],
               [59, 1, 'a3'],
               [60, 1, 'a2'],
               [61, 1, 'a3'],
               [62, 1, 'a2'],
               [63, 1, 'a3'],
            ]}
         />
      </Sequencer>
   </Song>
);

BackgroundMusicPlayer.propTypes = {
   playing: PropTypes.bool,
};

export default BackgroundMusicPlayer;
