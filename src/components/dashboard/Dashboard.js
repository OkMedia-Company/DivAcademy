import React from 'react'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div className='dashboard'>
              <h2 className="section-title">Dashboard</h2>
        <div className="dahsboard-items">
            <div className="dash-item">
                <h3 className="title">Cari aktiv tələbə</h3>
                <span className="count">250</span>
            </div>
            <div className="dash-item">
                <h3 className="title">Toplam tələbə</h3>
                <span className="count">250</span>
            </div>
            <div className="dash-item">
                <h3 className="title">Aktiv qrup</h3>
                <span className="count">250</span>
            </div>
            <div className="dash-item">
                <h3 className="title">Bu ay doğum günü sayı</h3>
                <span className="count">250</span>
            </div>
            <div className="dash-item">
                <h3 className="title">Açılış kassa</h3>
                <span className="count">250</span>
            </div>
            <div className="dash-item">
                <h3 className="title">Yekun kassa</h3>
                <span className="count">250</span>
            </div>
            <div className="dash-item">
                <h3 className="title">İnkişaf faizi</h3>
                <span className="count">250</span>
            </div>
            <div className="dash-item">
                <h3 className="title">Fərq</h3>
                <span className="count">250</span>
            </div>
            <div className="dash-item">
                <h3 className="title">Bu ay xərc</h3>
                <span className="count">250</span>
            </div>
            <div className="dash-item">
                <h3 className="title">Bu ay gəlir</h3>
                <span className="count">250</span>
            </div>
        </div>
    </div>
  )
}

export default Dashboard