import React from 'react';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

const popupStyle = {
  position: 'relative',
  top: '50%',
  left: '50%',
  width: '90%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: alpha('rgb(5, 32, 71)', 0.9),
  color: '#f8f8f2',
  fontFamily: 'monospace',
  fontSize: '1.2rem',
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
        We want to give people a visceral demonstration of the sorts of judgements 
        that are now, within the hiring pipelines of certain companies, 
        being made about them automatically.
      </p>

      <p>
      This hiring tool is a working prototype designed to demonstrate 
      how AI hiring companies are creating tools that claim to identify 
      personality, but in reality are identifying unrelated visual cues 
      which are then taken as evidence of Big Five personality schema. 
      You can see for yourself how your personality score changes when 
      you alter the lighting.
      </p>

      <p>
      This model is the first generation version and will evolve over time 
      to best reflect the hiring tools currently in use in the workforce 
      right now. As these tools are proprietary and very resource-intensive, 
      we're using a small personality recognition model that you can play 
      with in your browser -- although it is less powerful than the models 
      used in industry, it should behave in a similar way.
      </p>

      <p>
      Note: from examining industry recruiting tools, it's unclear whether 
      personality analysis is performed on the basis of video or of still 
      images. Indeed, AI hiring company Retorio's whitepaper suggests that 
      its model was assessed for fairness on the basis of the FairFace dataset 
      (which consists of still images), and based on this we're using a model 
      running on still images rather than video. However, we plan to eventually 
      design and launch a version based on video recognition software, to better 
      map against the kinds of cutting-edge tools on the market today. If you have 
      any questions or feedback please direct these to ed575@cam.ac.uk or kam83@cam.ac.uk
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
