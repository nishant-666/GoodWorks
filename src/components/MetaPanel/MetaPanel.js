import React from "react";
import { Segment, Accordion, Header, Icon, Image, List } from "semantic-ui-react";

class MetaPanel extends React.Component {
  state = {
    privateChannel: this.props.isPrivateChannel,
    activeIndex: 0,
    channel: this.props.currentChannel,
  };

  setActiveIndex = (event, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  formatCount = num => (num > 1 || num === 0 ? `${num} posts` : `${num} post`);

  displayTopPosters = posts =>
    Object.entries(posts)
      .sort((a, b) => b[1] - a[1])
      .map(([key, val], i) => (
        <List.Item key={i}>
          <Image avatar src={val.avatar} />
          <List.Content>
            <List.Header as="a" style={{fontFamily:'Poppins',fontSize:16,marginTop:5}}>{key}</List.Header>
            <List.Description style={{fontSize:14,marginTop:5}}>{this.formatCount(val.count)}</List.Description>
          </List.Content>
        </List.Item>
      ))
      .slice(0, 5);
  render() {
    const { activeIndex, privateChannel, channel } = this.state;
    const { userPosts } = this.props;
    if (privateChannel) return null;  

    return (
      <Segment style={{borderRadius:15}} loading={!channel}>
        <Header as="h3" attached="top" style={{marginBottom:10,borderRadius:15,fontFamily:'Poppins'}}>
        About #{channel && channel.name}
        </Header>
        <Accordion styled fluid attached="true" style={{borderRadius:15}}>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            style={{fontFamily:'Poppins'}}
            onClick={this.setActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="info" style={{fontSize:18}}/>
            Channel Details
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
          {channel && channel.details}
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            style={{fontFamily:'Poppins'}}
            onClick={this.setActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="user circle" />
            Top Posters
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
          <List style={{fontFamily:'Poppins'}}>{userPosts && this.displayTopPosters(userPosts)}</List>
          </Accordion.Content>

          <Accordion.Title
            style={{fontFamily:'Poppins'}}
            active={activeIndex === 2}
            index={2}
            onClick={this.setActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="pencil alternate" />
            Created By
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
          <Header as="h3" style={{fontFamily:'Poppins'}}>
              <Image circular src={channel && channel.createdBy.avatar} />
              {channel && channel.createdBy.name}
            </Header>
          </Accordion.Content>
        </Accordion>
      </Segment>
    );
  }
}

export default MetaPanel;
