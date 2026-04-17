import styles from './Hero.module.css'

export default function TrustLogos(){

return(

<div className={styles.trust}>

<span>Trusted by</span>

<div className={styles.logos}>

<img src="/logos/sap.svg" alt="SAP"/>
<img src="/logos/siemens.svg" alt="Siemens"/>
<img src="/logos/bmw.svg" alt="BMW"/>
<img src="/logos/adidas.svg" alt="Adidas"/>

</div>

</div>

)

}
