import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import colors from 'config/colors';

//models
import Thought from 'stores/models/Thought';

//data
import {graphql} from 'react-apollo';
import {ThoughtQuery, options} from './graphql-data';

//meta
import Helmet from 'react-helmet';
import {getMeta} from 'utils/head-utils';

//styled-components
import {RightSide, Content, Title, Top} from './styles';
import Spinner from 'components/Spinner';

@inject('store')
@graphql(ThoughtQuery, {options})
@observer
class ThoughtPage extends Component {
  render() {
    const {data} = this.props;
    const {loading} = data;
    let currentThought;

    if (data.allThoughts) {
      currentThought = new Thought(data.allThoughts[0]);
    }

    return (
      <RightSide backgroundColor={colors.thoughtsBackgroundColor}>

        {loading && <Spinner
          className="spinner"
          speed="0.8"
          size="4em"
          backgroundColor={colors.accent}
          color={colors.thoughtsBackgroundColor}
        />
        }

        {!loading && currentThought && <div>
          <Helmet
            title={currentThought.title}
            meta={getMeta({
              title: currentThought.title,
              description: currentThought.description,
              image: currentThought.coverImage
            })
            }
          />
          <Top>
            <Title>{currentThought.title}</Title>
            <Content dangerouslySetInnerHTML={{__html: currentThought.content}}/>
          </Top>
        </div>
        }

      </RightSide>
    )
  }
}

export default ThoughtPage;