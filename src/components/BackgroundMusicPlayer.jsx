import React, { PropTypes } from 'react';
import { Song, Sequencer, Synth, Sampler } from 'react-music';
import theme from '../sound/sequences/theme';
import hihat from '../sound/samples/hihat.wav';

const offset = amount => steps =>
   steps.map(step => ([
      step[0] + amount,
      ...step.slice(1),
   ]));

const BackgroundMusicPlayer = ({ playing = true }) => (
   <Song playing={playing} tempo={150}>
      <Sequencer resolution={16} bars={24}>
         <Synth
            type="square"
            gain={0.1}
            steps={[
               ...theme.A.melody,
               ...offset(8 * 16)(theme.A.melody),
            ]}
         />
         <Synth
            type="square"
            gain={0.1}
            steps={offset(16 * 16)(theme.B.melody)}
            envelope={{ attack: 0.2 }}
         />
         <Synth
            type="square"
            gain={0.1}
            steps={[
               ...theme.A.harmony,
               ...offset(8 * 16)(theme.A.harmony),
            ]}
         />
         <Synth
            type="square"
            gain={0.1}
            steps={offset(16 * 16)(theme.B.harmony)}
            envelope={{ attack: 0.2 }}
         />
      </Sequencer>
      <Sequencer resolution={8} bars={24}>
         <Synth
            type="square"
            gain={0.1}
            steps={[
               ...theme.A.bass,
               ...offset(8 * 8)(theme.A.bass),
               ...offset(8 * 16)(theme.B.bass),
               ...offset(8 * 20)(theme.B.bass),
            ]}
         />
      </Sequencer>
      <Sequencer resolution={16} bars={2}>
         <Sampler
            gain={0.3}
            sample={hihat}
            steps={[2, 6, 10, 11, 14, 18, 22, 26, 28, 30]}
         />
      </Sequencer>
   </Song>
);

BackgroundMusicPlayer.propTypes = {
   playing: PropTypes.bool,
};

export default BackgroundMusicPlayer;
