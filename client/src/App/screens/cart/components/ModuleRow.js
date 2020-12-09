/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from '@emotion/core';

import {Link, navigate} from '@reach/router';
import * as mq from '../../../styles/media-queries';
import * as colors from '../../../styles/colors';
import { Button } from '@material-ui/core';
import { FormGroup } from '../../../components';

function ModuleRow(props) {
  const {title, author, coverImageUrl} = props.book;
  const {finished, book} = props;
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
      }}
    >
      <div
        css={{
          flexGrow: 2,
          display: 'grid',
          gridTemplateColumns: '140px 1fr',
          gridGap: 20,
          border: `1px solid ${colors.gray20}`,
          color: colors.text,
          padding: '1.25em',
          borderRadius: '3px',
          ':hover,:focus': {
            textDecoration: 'none',
            boxShadow: '0 5px 15px -5px rgba(0,0,0,.08)',
            color: 'inherit',
          },
        }}
      >
        <div
          css={{
            width: 140,
            [mq.small]: {
              width: 100,
            },
          }}
        >
          <img
            src={coverImageUrl}
            alt={`${title} book cover`}
            css={{maxHeight: '100%', maxWidth: '100%'}}
          />
        </div>
        <div css={{flex: 1}}>
          <div css={{display: 'flex', justifyContent: 'space-between'}}>
            <div css={{flex: 1}}>
              <h2
                css={{
                  fontSize: '1.25em',
                  margin: '0',
                  color: colors.indigo,
                }}
              >
                {title}
              </h2>
             </div>
            <div css={{marginLeft: 10}}>
              <div
                css={{
                  marginTop: '0.4em',
                  fontStyle: 'italic',
                  fontSize: '0.85em',
                }}
              >
                {author}
              </div>
              <small>{book.publisher}</small>
            </div>
          </div>
          <small css={{fontSize: "0.85em", lineHeight: "2em"}}>{book.synopsis.substring(0, 500)}...</small>
          {!finished && <div css={{
            paddingTop: "0.85em",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly"
          }}>
          <FormGroup>
              <Link to={`/cart/module/${book.id}`}>
                <Button 
                css={{width: '120px'}}
                    variant="outlined"
                    color="primary"
                    ><small>Go to Cart</small></Button>
              </Link>
            </FormGroup>
            <FormGroup>
              {/* <Link to={`/checkout/${book.id}`}> */}
                <Button 
                onClick={() => navigate(`/cart/checkout/${book.id}`)}
                css={{width: '120px'}}
                    variant="contained"
                    color="primary"
                    ><small>Buy now</small></Button>
              {/* </Link> */}
            </FormGroup>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default ModuleRow;
