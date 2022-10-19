import './Progressbar.css'

function ProgressBar(props) {

  return (
      <div>
        <div className="meter">
          <span style={{ width: props.percentage +'%' }}></span>
        </div>
      </div>
  );
}

export default ProgressBar;
