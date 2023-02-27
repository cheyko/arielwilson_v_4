import withContext from "../../../../withContext"

 const AssignmentItem = props => {

    return(
        <div className="card">
        <header className="card-header">
            <p className="card-header-title">
                Booking 
            </p>
            <button class="card-header-icon" aria-label="more options">
            <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
            </button>
        </header>
        <div className="card-content">
            <div className="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                <span>@bulmaio</span>. <span>#css</span> <span>#responsive</span>
                <br/>
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
        </div>
            <footer class="card-footer">
                <span class="card-footer-item">Complete</span>
                <span class="card-footer-item">Edit</span>
                <span class="card-footer-item">Cancel</span>
            </footer>
    </div>
    )

}
export default withContext(AssignmentItem);