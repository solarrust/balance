import React, { Component } from "react";

class TeamMember extends Component {
  render() {
    return (
      <div className="team-item">
        <div className="team-item__picture">
          <img
            className="_loading"
            src={this.props.member.pic}
            alt=""
            onLoad={this.props.imageLoaded.bind(this)}
          />
        </div>
        <div className="team-item__content">
          <h3 className="team-item__name">{this.props.member.name}</h3>
          <span className="team-item__position">
            {this.props.member.position}
          </span>
          <ul className="team-item__social-list social-list">
            <li className="social-list__item _fb" data-parallax-link-scene>
              {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={this.props.member.fb}
                data-parallax-link
                data-depth="2"
                title="facebook"
                aria-label="facebook"
              />
            </li>
            {this.props.member.tw ? (
              <li className="social-list__item _tw" data-parallax-link-scene>
                {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={this.props.member.tw}
                  data-parallax-link
                  data-depth="2"
                  title="twitter"
                  aria-label="twitter"
                />
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default TeamMember;
