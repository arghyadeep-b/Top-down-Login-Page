import './SocialContainer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'

export function SocialContainer() {
    return (
        <div className="social-container">
            <button><a href="#" className="social"><FontAwesomeIcon icon={faFacebookF} /></a></button>
            <button><a href="#" className="social"><FontAwesomeIcon icon={faGoogle} /></a></button>
            <button><a href="#" className="social"><FontAwesomeIcon icon={faTwitter} /></a></button>
        </div>
    )
}