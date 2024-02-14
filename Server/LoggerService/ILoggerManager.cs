﻿namespace LoggerService
{
    public interface ILoggerManager
    {
        public void Info(string message);
        public void Warn(string message);
        public void Error(string message);
        public void Debug(string message);
    }
}
