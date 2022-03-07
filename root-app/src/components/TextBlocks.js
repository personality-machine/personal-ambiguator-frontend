import React from 'react';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

const popupStyle = {
  position: 'relative',
  top: '50%',
  left: '50%',
  width: '80%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: alpha('rgb(5, 32, 71)', 0.9),
  color: '#f8f8f2',
  fontFamily: 'monospace',
  fontSize: '1.3rem',
  textAlign: 'left',
  border: '2px solid rgb(25, 79, 156)',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
  padding: '15px',
};

const IntroductionBlock = () => {
  return (
    <Box style={popupStyle}>
      <h3>
        Introduction to personality AI:
      </h3>

      <p>

        If you’re applying for a job today, you might be asked to be
        interviewed by an AI. There are now many AI companies that use AI
        to analyse videos of candidates before putting you through (or
        not) to the next round.

      </p>
        
      <p>

        These tools claim to assess a candidate’s personality to tell if
        you are the right fit for the job. They say that they can know
        your personality from looking at your face. The idea is that,
        like a lie-detector test, AI can see ‘through’ your face to the
        real you. The real you, they say, can be given a Big 5
        personality trait score for:

        <ul>
          <li>extroversion</li>
          <li>agreeablenes</li>
          <li>openness</li>
					<li>conscientiousness</li>
          <li>neuroticism</li>
        </ul>

        They claim that, by looking at specific regions of your face, AI
        can tell your Big 5. From there, they can give you a job or
        reject you.

      </p>
    </Box>
  );
};

const ToolBlock = () => {
  return (
    <Box style={popupStyle}>
      <h3>
        Why we made our tool:
      </h3>

      <p>

        But using our tool, you can see for yourself how your personality score
        changes when you alter the lighting, put on a pair of glasses or apply
        artificial filters to your image. You can see which parts of your face
        the AI thinks are most revealing of your personality. And you can
        decide for yourself if you think it works.

      </p>

      <p align='center'>

        <i>! All data is processed locally and deleted once you exit the tab !</i>

      </p>

    </Box>
  );
};

const BiasesBlock = () => {
  return (
    <Box style={popupStyle}>
      <h3>
        Personality of the 'real you':
      </h3>

      <p>

        Some AI companies also claim that AI can take away or ignore your race
        and gender by just focusing on personality. But are race and gender
        just things that are layered on top of the 'real you'?

      </p>

      <p>

        We don’t think this is a meaningful way of addressing discrimination
        and underrepresentation in the hiring process.

      </p>

      </Box>
  );
};

export { IntroductionBlock, ToolBlock, BiasesBlock };
