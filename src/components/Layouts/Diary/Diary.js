import React, { Component, Fragment } from 'react'
import { Grid, Paper, Typography, List, ListItem, ListItemText } from '@material-ui/core'


export default class Diary extends Component {
  render() {
    return (
      <Grid container sm={12}>
        <Grid item sm={3}>
          <Paper>
            <Typography variant="headline">
              Сентябрь 2018
            </Typography>
            <List component="ul">
              <ListItem
                button
                key={0}
              >
                <ListItemText
                  primary="Привет дневник"
                />
              </ListItem>
              <ListItem
                button
                key={1}
              >
                <ListItemText
                  primary="Привет дневник"
                />
              </ListItem>
              <ListItem
                button
                key={2}
              >
                <ListItemText
                  primary="Привет дневник"
                />
              </ListItem>
            </List>
            <Typography variant="headline">
              Октябрь 2018
            </Typography>

          </Paper>
        </Grid>
        <Grid item sm={9}>
          <Paper>
            
          </Paper>
        </Grid>
      </Grid>
    )
  }
}
