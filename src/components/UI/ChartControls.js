// src/components/UI/ChartControls.js
import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

const ChartControls = ({ chartId, chartTitle = 'Chart' }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const chartRef = useRef(null);

  const handleDownload = async () => {
    try {
      // Tìm chart container
      let chartElement = document.getElementById(chartId);
      if (!chartElement) {
        // Nếu không tìm thấy bằng ID, tìm parent chart-card
        chartElement = chartRef.current?.closest('.chart-card');
      }
      
      if (!chartElement) {
        alert('Không tìm thấy chart để tải về!');
        return;
      }

      // Tạo một bản sao để không ảnh hưởng đến chart gốc
      const clonedElement = chartElement.cloneNode(true);
      clonedElement.style.position = 'absolute';
      clonedElement.style.left = '-9999px';
      clonedElement.style.backgroundColor = '#ffffff';
      document.body.appendChild(clonedElement);

      const canvas = await html2canvas(clonedElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: clonedElement.scrollWidth,
        height: clonedElement.scrollHeight
      });

      document.body.removeChild(clonedElement);

      const link = document.createElement('a');
      link.download = `${chartTitle}_${new Date().getTime()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading chart:', error);
      alert('Có lỗi xảy ra khi tải chart! Vui lòng thử lại.');
    }
  };

  const handleFullscreen = () => {
    const chartElement = document.getElementById(chartId) || chartRef.current;
    if (!chartElement) return;

    if (!isFullscreen) {
      if (chartElement.requestFullscreen) {
        chartElement.requestFullscreen();
      } else if (chartElement.webkitRequestFullscreen) {
        chartElement.webkitRequestFullscreen();
      } else if (chartElement.msRequestFullscreen) {
        chartElement.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen changes
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="chart-controls" ref={chartRef}>
      <button 
        className="chart-control-btn" 
        onClick={handleDownload}
        title="Tải về hình ảnh (PNG)"
      >
        💾 Tải về
      </button>
      <button 
        className="chart-control-btn" 
        onClick={handleFullscreen}
        title={isFullscreen ? "Thoát chế độ toàn màn hình" : "Phóng to toàn màn hình"}
      >
        {isFullscreen ? '🗗 Thoát FS' : '🗖 Fullscreen'}
      </button>
    </div>
  );
};

export default ChartControls;

