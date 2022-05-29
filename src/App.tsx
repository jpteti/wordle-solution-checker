import React from 'react';
import 'bulma/css/bulma.min.css';
import Checker from './Checker';
import { Section, Container, Heading } from 'react-bulma-components';

function App() {
  return (
    <Section>
      <Container>
        <Heading>Wordle Solution Checker</Heading>
        <Checker />
      </Container>
    </Section>
  );
}

export default App;
