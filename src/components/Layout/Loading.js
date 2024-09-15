import Loader from '../../img/loading.svg'

import styles from './Loading.module.css'

function Loading() {
    return (
        <div className={styles.loader}>
            <img src={Loader} alt='carregando' />
        </div>
    )
}
export default Loading